import { createHash } from "node:crypto";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import {
  BPF_LOADER_UPGRADEABLE_PROGRAM_ID,
  CHANNEL_V2_SEED,
  GLOBAL_CONFIG_SEED,
  LIQUIDITY_VAULT_SEED,
  MESSAGE_DOMAIN_TAG,
  PARTICIPANT_SEED,
  RESERVE_SEED,
  SHARE_MINT_SEED,
  TOKEN_REGISTRY_SEED,
  VAULT_TOKEN_ACCOUNT_SEED,
  YIELD_SHARE_VAULT_SEED,
  YIELD_STRATEGY_SEED,
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
      new anchor.BN(tokenId).toArrayLike(Buffer, "le", 2),
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

/**
 * v6: PDA for the per-token YieldStrategy account inside agon-protocol.
 * Seed: `[YIELD_STRATEGY_SEED, token_id_le]`.
 */
export function findYieldStrategyPda(
  programId: PublicKey,
  tokenId: number,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(YIELD_STRATEGY_SEED),
      new anchor.BN(tokenId).toArrayLike(Buffer, "le", 2),
    ],
    programId,
  )[0];
}

/**
 * v6: PDA for the protocol-owned cUSDC ATA backing a yield-bearing token. Authority is the
 * GlobalConfig PDA.
 * Seed: `[YIELD_SHARE_VAULT_SEED, token_id_le]`.
 */
export function findYieldShareVaultPda(
  programId: PublicKey,
  tokenId: number,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(YIELD_SHARE_VAULT_SEED),
      new anchor.BN(tokenId).toArrayLike(Buffer, "le", 2),
    ],
    programId,
  )[0];
}

/**
 * v6: PDA for a mock-yield (or production-shaped lending) Reserve account.
 * Seed: `[RESERVE_SEED, underlying_mint]`.
 */
export function findReservePda(
  yieldProgramId: PublicKey,
  underlyingMint: PublicKey,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(RESERVE_SEED), underlyingMint.toBuffer()],
    yieldProgramId,
  )[0];
}

/** v6: PDA for the lending share mint (cUSDC). */
export function findShareMintPda(
  yieldProgramId: PublicKey,
  underlyingMint: PublicKey,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(SHARE_MINT_SEED), underlyingMint.toBuffer()],
    yieldProgramId,
  )[0];
}

/** v6: PDA for the lending program's underlying liquidity vault (USDC). */
export function findLiquidityVaultPda(
  yieldProgramId: PublicKey,
  underlyingMint: PublicKey,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(LIQUIDITY_VAULT_SEED), underlyingMint.toBuffer()],
    yieldProgramId,
  )[0];
}
