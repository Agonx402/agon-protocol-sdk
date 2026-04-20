import { createHash } from "node:crypto";
import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import {
  BPF_LOADER_UPGRADEABLE_PROGRAM_ID,
  CHANNEL_V2_SEED,
  GLOBAL_CONFIG_SEED,
  MESSAGE_DOMAIN_TAG,
  PARTICIPANT_SEED,
  TOKEN_REGISTRY_SEED,
  VAULT_TOKEN_ACCOUNT_SEED,
} from "./constants.js";

export function deriveMessageDomain(
  programId: PublicKey,
  chainId: number,
): Buffer {
  return createHash("sha256")
    .update(MESSAGE_DOMAIN_TAG)
    .update(programId.toBuffer())
    .update(Buffer.from([chainId & 0xff, (chainId >> 8) & 0xff]))
    .digest()
    .subarray(0, 16);
}

export function findGlobalConfigPda(programId: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(GLOBAL_CONFIG_SEED)],
    programId,
  )[0];
}

export function findTokenRegistryPda(programId: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(TOKEN_REGISTRY_SEED)],
    programId,
  )[0];
}

export function findParticipantPda(
  programId: PublicKey,
  owner: PublicKey,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(PARTICIPANT_SEED), owner.toBytes()],
    programId,
  )[0];
}

export function findVaultTokenAccountPda(
  programId: PublicKey,
  tokenId: number,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(VAULT_TOKEN_ACCOUNT_SEED),
      new BN(tokenId).toArrayLike(Buffer, "le", 2),
    ],
    programId,
  )[0];
}

export function findChannelPda(
  programId: PublicKey,
  payerId: number,
  payeeId: number,
  tokenId: number,
): PublicKey {
  const payerIdBytes = Buffer.alloc(4);
  payerIdBytes.writeUInt32LE(payerId, 0);

  const payeeIdBytes = Buffer.alloc(4);
  payeeIdBytes.writeUInt32LE(payeeId, 0);

  const tokenIdBytes = Buffer.alloc(2);
  tokenIdBytes.writeUInt16LE(tokenId, 0);

  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(CHANNEL_V2_SEED),
      payerIdBytes,
      payeeIdBytes,
      tokenIdBytes,
    ],
    programId,
  )[0];
}

export function findProgramDataPda(programId: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [programId.toBuffer()],
    BPF_LOADER_UPGRADEABLE_PROGRAM_ID,
  )[0];
}
