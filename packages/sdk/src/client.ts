import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {
  PublicKey,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SystemProgram,
} from "@solana/web3.js";
import {
  AGON_PROTOCOL_PROGRAM_ID,
  BPF_LOADER_UPGRADEABLE_PROGRAM_ID,
  SPL_TOKEN_PROGRAM_ID,
} from "./constants.js";
import idlJson from "./generated/agon_protocol.json" with { type: "json" };
import type { AgonProtocol } from "./generated/agon_protocol.js";
import {
  findChannelPda,
  findGlobalConfigPda,
  findParticipantPda,
  findProgramDataPda,
  findTokenRegistryPda,
  findVaultTokenAccountPda,
} from "./pdas.js";
import type { Amountish, CreateAgonClientOptions } from "./types.js";
import { toAnchorBn } from "./types.js";

function cloneIdlWithProgramAddress(programId: PublicKey): AgonProtocol {
  const idl = JSON.parse(JSON.stringify(idlJson)) as AgonProtocol;
  (idl as unknown as { address: string }).address = programId.toBase58();
  return idl;
}

export function getAgonIdl(programId: PublicKey = AGON_PROTOCOL_PROGRAM_ID) {
  return cloneIdlWithProgramAddress(programId);
}

export function createAgonProgram({
  provider,
  programId = AGON_PROTOCOL_PROGRAM_ID,
}: CreateAgonClientOptions): Program<AgonProtocol> {
  return new Program(getAgonIdl(programId), provider) as Program<AgonProtocol>;
}

export class AgonClient {
  readonly provider: anchor.AnchorProvider;
  readonly programId: PublicKey;
  readonly program: Program<AgonProtocol>;

  constructor({ provider, programId = AGON_PROTOCOL_PROGRAM_ID }: CreateAgonClientOptions) {
    this.provider = provider;
    this.programId = programId;
    this.program = createAgonProgram({ provider, programId });
  }

  globalConfigAddress(): PublicKey {
    return findGlobalConfigPda(this.programId);
  }

  tokenRegistryAddress(): PublicKey {
    return findTokenRegistryPda(this.programId);
  }

  participantAddress(owner: PublicKey): PublicKey {
    return findParticipantPda(this.programId, owner);
  }

  vaultTokenAccountAddress(tokenId: number): PublicKey {
    return findVaultTokenAccountPda(this.programId, tokenId);
  }

  channelAddress(payerId: number, payeeId: number, tokenId: number): PublicKey {
    return findChannelPda(this.programId, payerId, payeeId, tokenId);
  }

  programDataAddress(): PublicKey {
    return findProgramDataPda(this.programId);
  }

  async fetchGlobalConfig() {
    return this.program.account.globalConfig.fetch(this.globalConfigAddress());
  }

  async fetchTokenRegistry() {
    return this.program.account.tokenRegistry.fetch(this.tokenRegistryAddress());
  }

  async fetchParticipant(owner: PublicKey) {
    return this.program.account.participantAccount.fetch(this.participantAddress(owner));
  }

  async participantId(owner: PublicKey): Promise<number> {
    const participant = await this.fetchParticipant(owner);
    return participant.participantId;
  }

  async channelAddressForOwners(
    payerOwner: PublicKey,
    payeeOwner: PublicKey,
    tokenId: number,
  ): Promise<PublicKey> {
    const [payer, payee] = await Promise.all([
      this.fetchParticipant(payerOwner),
      this.fetchParticipant(payeeOwner),
    ]);

    return this.channelAddress(payer.participantId, payee.participantId, tokenId);
  }

  async fetchChannel(params: {
    channelState?: PublicKey;
    payerOwner?: PublicKey;
    payeeOwner?: PublicKey;
    tokenId?: number;
  }) {
    const channelState =
      params.channelState ??
      (await this.channelAddressForOwners(
        params.payerOwner!,
        params.payeeOwner!,
        params.tokenId!,
      ));

    return this.program.account.channelState.fetch(channelState);
  }

  initializeParticipant(params: {
    owner: PublicKey;
    feeRecipient: PublicKey;
    participantAccount?: PublicKey;
    globalConfig?: PublicKey;
  }) {
    return this.program.methods.initializeParticipant().accounts({
      globalConfig: params.globalConfig ?? this.globalConfigAddress(),
      participantAccount:
        params.participantAccount ?? this.participantAddress(params.owner),
      feeRecipient: params.feeRecipient,
      owner: params.owner,
      systemProgram: SystemProgram.programId,
    } as any);
  }

  async createChannel(params: {
    owner: PublicKey;
    payeeOwner?: PublicKey | null;
    payerAccount?: PublicKey;
    payeeAccount?: PublicKey;
    channelState?: PublicKey;
    tokenId: number;
    authorizedSigner?: PublicKey | null;
  }) {
    const payerAccount =
      params.payerAccount ?? this.participantAddress(params.owner);
    const payeeAccount =
      params.payeeAccount ??
      (params.payeeOwner ? this.participantAddress(params.payeeOwner) : null);

    if (!payeeAccount) {
      throw new Error("createChannel requires payeeAccount or payeeOwner.");
    }

    let channelState = params.channelState;
    if (!channelState) {
      const [payerParticipant, payeeParticipant] = await Promise.all([
        this.program.account.participantAccount.fetch(payerAccount),
        this.program.account.participantAccount.fetch(payeeAccount),
      ]);
      channelState = this.channelAddress(
        payerParticipant.participantId,
        payeeParticipant.participantId,
        params.tokenId,
      );
    }

    return this.program.methods
      .createChannel(params.tokenId, params.authorizedSigner ?? null)
      .accounts({
        tokenRegistry: this.tokenRegistryAddress(),
        payerAccount,
        payeeAccount,
        channelState,
        owner: params.owner,
        payeeOwner: params.payeeOwner ?? null,
        systemProgram: SystemProgram.programId,
      } as any);
  }

  deposit(params: {
    owner: PublicKey;
    ownerTokenAccount: PublicKey;
    tokenId: number;
    amount: Amountish;
    participantAccount?: PublicKey;
    vaultTokenAccount?: PublicKey;
  }) {
    return this.program.methods.deposit(params.tokenId, toAnchorBn(params.amount)).accounts({
      tokenRegistry: this.tokenRegistryAddress(),
      globalConfig: this.globalConfigAddress(),
      participantAccount:
        params.participantAccount ?? this.participantAddress(params.owner),
      ownerTokenAccount: params.ownerTokenAccount,
      vaultTokenAccount:
        params.vaultTokenAccount ?? this.vaultTokenAccountAddress(params.tokenId),
      owner: params.owner,
      tokenProgram: SPL_TOKEN_PROGRAM_ID,
    } as any);
  }

  async lockChannelFunds(params: {
    owner: PublicKey;
    payeeOwner?: PublicKey;
    payerAccount?: PublicKey;
    payeeAccount?: PublicKey;
    channelState?: PublicKey;
    tokenId: number;
    amount: Amountish;
  }) {
    const payerAccount =
      params.payerAccount ?? this.participantAddress(params.owner);
    const payeeAccount =
      params.payeeAccount ??
      (params.payeeOwner ? this.participantAddress(params.payeeOwner) : null);

    if (!payeeAccount) {
      throw new Error("lockChannelFunds requires payeeAccount or payeeOwner.");
    }

    const channelState =
      params.channelState ??
      (await this.resolveChannelAddress(payerAccount, payeeAccount, params.tokenId));

    return this.program.methods
      .lockChannelFunds(params.tokenId, toAnchorBn(params.amount))
      .accounts({
        tokenRegistry: this.tokenRegistryAddress(),
        payerAccount,
        payeeAccount,
        channelState,
        owner: params.owner,
        systemProgram: SystemProgram.programId,
      } as any);
  }

  async requestUnlockChannelFunds(params: {
    owner: PublicKey;
    payeeOwner?: PublicKey;
    payerAccount?: PublicKey;
    payeeAccount?: PublicKey;
    channelState?: PublicKey;
    tokenId: number;
    amount: Amountish;
  }) {
    const payerAccount =
      params.payerAccount ?? this.participantAddress(params.owner);
    const payeeAccount =
      params.payeeAccount ??
      (params.payeeOwner ? this.participantAddress(params.payeeOwner) : null);

    if (!payeeAccount) {
      throw new Error(
        "requestUnlockChannelFunds requires payeeAccount or payeeOwner.",
      );
    }

    const channelState =
      params.channelState ??
      (await this.resolveChannelAddress(payerAccount, payeeAccount, params.tokenId));

    return this.program.methods
      .requestUnlockChannelFunds(params.tokenId, toAnchorBn(params.amount))
      .accounts({
        globalConfig: this.globalConfigAddress(),
        payerAccount,
        payeeAccount,
        channelState,
        owner: params.owner,
      } as any);
  }

  async executeUnlockChannelFunds(params: {
    owner: PublicKey;
    payeeOwner?: PublicKey;
    payerAccount?: PublicKey;
    payeeAccount?: PublicKey;
    channelState?: PublicKey;
    tokenId: number;
  }) {
    const payerAccount =
      params.payerAccount ?? this.participantAddress(params.owner);
    const payeeAccount =
      params.payeeAccount ??
      (params.payeeOwner ? this.participantAddress(params.payeeOwner) : null);

    if (!payeeAccount) {
      throw new Error(
        "executeUnlockChannelFunds requires payeeAccount or payeeOwner.",
      );
    }

    const channelState =
      params.channelState ??
      (await this.resolveChannelAddress(payerAccount, payeeAccount, params.tokenId));

    return this.program.methods.executeUnlockChannelFunds(params.tokenId).accounts({
      globalConfig: this.globalConfigAddress(),
      payerAccount,
      payeeAccount,
      channelState,
      owner: params.owner,
    } as any);
  }

  requestWithdrawal(params: {
    owner: PublicKey;
    withdrawalDestination: PublicKey;
    tokenId: number;
    amount: Amountish;
    participantAccount?: PublicKey;
  }) {
    return this.program.methods
      .requestWithdrawal(
        params.tokenId,
        toAnchorBn(params.amount),
        params.withdrawalDestination,
      )
      .accounts({
        tokenRegistry: this.tokenRegistryAddress(),
        globalConfig: this.globalConfigAddress(),
        participantAccount:
          params.participantAccount ?? this.participantAddress(params.owner),
        withdrawalDestination: params.withdrawalDestination,
        owner: params.owner,
      } as any);
  }

  executeWithdrawalTimelocked(params: {
    tokenId: number;
    participantAccount: PublicKey;
    vaultTokenAccount?: PublicKey;
    withdrawalDestination: PublicKey;
    feeRecipientTokenAccount: PublicKey;
  }) {
    return this.program.methods
      .executeWithdrawalTimelocked(params.tokenId)
      .accounts({
        tokenRegistry: this.tokenRegistryAddress(),
        globalConfig: this.globalConfigAddress(),
        participantAccount: params.participantAccount,
        vaultTokenAccount:
          params.vaultTokenAccount ?? this.vaultTokenAccountAddress(params.tokenId),
        withdrawalDestination: params.withdrawalDestination,
        feeRecipientTokenAccount: params.feeRecipientTokenAccount,
        tokenProgram: SPL_TOKEN_PROGRAM_ID,
      } as any);
  }

  cancelWithdrawal(params: { owner: PublicKey; tokenId: number; participantAccount?: PublicKey }) {
    return this.program.methods.cancelWithdrawal(params.tokenId).accounts({
      participantAccount:
        params.participantAccount ?? this.participantAddress(params.owner),
      owner: params.owner,
    } as any);
  }

  updateInboundChannelPolicy(params: {
    owner: PublicKey;
    inboundChannelPolicy: number;
    participantAccount?: PublicKey;
  }) {
    return this.program.methods
      .updateInboundChannelPolicy(params.inboundChannelPolicy)
      .accounts({
        participantAccount:
          params.participantAccount ?? this.participantAddress(params.owner),
        owner: params.owner,
      } as any);
  }

  settleIndividual(params: {
    payerAccount: PublicKey;
    payeeAccount: PublicKey;
    channelState: PublicKey;
    submitter: PublicKey;
  }) {
    return this.program.methods.settleIndividual().accounts({
      tokenRegistry: this.tokenRegistryAddress(),
      globalConfig: this.globalConfigAddress(),
      payerAccount: params.payerAccount,
      payeeAccount: params.payeeAccount,
      channelState: params.channelState,
      submitter: params.submitter,
      instructionsSysvar: SYSVAR_INSTRUCTIONS_PUBKEY,
    } as any);
  }

  settleCommitmentBundle(params: {
    count: number;
    payeeAccount: PublicKey;
    submitter: PublicKey;
  }) {
    return this.program.methods.settleCommitmentBundle(params.count).accounts({
      tokenRegistry: this.tokenRegistryAddress(),
      globalConfig: this.globalConfigAddress(),
      payeeAccount: params.payeeAccount,
      submitter: params.submitter,
      instructionsSysvar: SYSVAR_INSTRUCTIONS_PUBKEY,
    } as any);
  }

  settleClearingRound(params: { submitter: PublicKey }) {
    return this.program.methods.settleClearingRound().accounts({
      tokenRegistry: this.tokenRegistryAddress(),
      globalConfig: this.globalConfigAddress(),
      submitter: params.submitter,
      instructionsSysvar: SYSVAR_INSTRUCTIONS_PUBKEY,
    } as any);
  }

  initializeProtocol(params: {
    chainId: number;
    feeBps: number;
    registrationFeeLamports: Amountish;
    feeRecipient: PublicKey;
    upgradeAuthority: PublicKey;
    initialAuthority?: PublicKey | null;
  }) {
    return this.program.methods
      .initialize(
        params.chainId,
        params.feeBps,
        toAnchorBn(params.registrationFeeLamports),
        params.initialAuthority ?? null,
      )
      .accounts({
        globalConfig: this.globalConfigAddress(),
        feeRecipient: params.feeRecipient,
        upgradeAuthority: params.upgradeAuthority,
        program: this.programId,
        programData: this.programDataAddress(),
        systemProgram: SystemProgram.programId,
      } as any);
  }

  registerToken(params: {
    authority: PublicKey;
    mint: PublicKey;
    tokenId: number;
    symbol: string;
    vaultTokenAccount?: PublicKey;
  }) {
    return this.program.methods
      .registerToken(params.tokenId, encodeSymbol(params.symbol))
      .accounts({
        tokenRegistry: this.tokenRegistryAddress(),
        vaultTokenAccount:
          params.vaultTokenAccount ?? this.vaultTokenAccountAddress(params.tokenId),
        mint: params.mint,
        globalConfig: this.globalConfigAddress(),
        authority: params.authority,
        tokenProgram: SPL_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      } as any);
  }

  private async resolveChannelAddress(
    payerAccount: PublicKey,
    payeeAccount: PublicKey,
    tokenId: number,
  ) {
    const [payerParticipant, payeeParticipant] = await Promise.all([
      this.program.account.participantAccount.fetch(payerAccount),
      this.program.account.participantAccount.fetch(payeeAccount),
    ]);

    return this.channelAddress(
      payerParticipant.participantId,
      payeeParticipant.participantId,
      tokenId,
    );
  }
}

export function encodeSymbol(symbol: string): number[] {
  if (!/^[\x20-\x7E]{1,8}$/.test(symbol)) {
    throw new Error("Token symbol must be 1-8 printable ASCII characters.");
  }

  const bytes = Buffer.alloc(8);
  Buffer.from(symbol, "ascii").copy(bytes, 0, 0, 8);
  return [...bytes];
}

export {
  AGON_PROTOCOL_PROGRAM_ID,
  BPF_LOADER_UPGRADEABLE_PROGRAM_ID,
  findChannelPda,
  findGlobalConfigPda,
  findParticipantPda,
  findProgramDataPda,
  findTokenRegistryPda,
  findVaultTokenAccountPda,
};
