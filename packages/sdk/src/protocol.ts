import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ed25519 } from "@noble/curves/ed25519.js";
import { PublicKey } from "@solana/web3.js";
import {
  AGON_CHAIN_IDS,
  OFFICIAL_DEVNET_USDC_MINT,
  OFFICIAL_USDC_DECIMALS,
  OFFICIAL_USDC_SYMBOL,
} from "./constants.js";
import { createCommitmentMessage } from "./messages.js";
import { deriveMessageDomain } from "./pdas.js";
import type { Amountish, CommitmentMessageParams } from "./types.js";
import { toBigIntAmount } from "./types.js";

export type ProtocolCluster = keyof typeof AGON_CHAIN_IDS;

export interface ProtocolTokenConfig {
  tokenId: number;
  mint: string;
  symbol: string;
  decimals: number;
}

export interface ResolveCanonicalDevnetUsdcTokenOptions {
  registry?: { tokens?: unknown[] } | null;
  deploymentConfig?: unknown;
  deploymentConfigPath?: string;
  env?: Record<string, string | undefined>;
}

export interface ChannelHeadroomInput {
  settledCumulative: Amountish;
  lockedBalance: Amountish;
  pendingUnlockAmount?: Amountish | null;
}

export interface ChannelHeadroom {
  settledCumulative: bigint;
  lockedBalance: bigint;
  pendingUnlockAmount: bigint;
  effectiveLocked: bigint;
  maxAuthorized: bigint;
  latestAcceptedCommitted: bigint;
  remainingHeadroom: bigint;
}

export interface GatewayCommitmentPayload {
  version: 1;
  cluster: ProtocolCluster;
  programId: string;
  chainId: number;
  messageDomain: string;
  tokenId: number;
  tokenMint: string;
  tokenSymbol: string;
  tokenDecimals: number;
  payerId: number;
  payeeId: number;
  committedAmount: string;
  authorizedSettler: string | null;
  signer: string;
  signature?: string;
}

export interface BuildGatewayCommitmentPayloadParams
  extends Omit<CommitmentMessageParams, "messageDomain"> {
  cluster?: ProtocolCluster;
  programId: PublicKey | string;
  chainId?: number;
  messageDomain?: Buffer | Uint8Array | string;
  tokenMint?: PublicKey | string;
  tokenSymbol?: string;
  tokenDecimals?: number;
  signer: PublicKey | string;
  signature?: Buffer | Uint8Array | string;
}

export interface VerifyGatewayCommitmentEnvelopeResult {
  ok: boolean;
  payload: GatewayCommitmentPayload;
  messageBase64: string;
  error?: string;
}

export interface CommitmentBundlePlanEntry {
  payerId: number;
  payeeId: number;
  tokenId: number;
  channelState?: string;
  committedAmount: string;
  deltaFromSettled: string;
  signer?: string;
  signature?: string;
}

export interface CommitmentBundlePlan {
  payeeId: number;
  tokenId: number;
  count: number;
  totalDeltaFromSettled: string;
  entries: CommitmentBundlePlanEntry[];
}

function envValue(
  env: Record<string, string | undefined> | undefined,
  key: string,
): string | undefined {
  return env?.[key] ?? process.env[key];
}

function normalizePublicKey(value: PublicKey | string): PublicKey {
  return value instanceof PublicKey ? value : new PublicKey(value);
}

function toBase64(value: Buffer | Uint8Array | string): string {
  if (typeof value === "string") {
    return value;
  }
  return Buffer.from(value).toString("base64");
}

function fromBase64(value: string, label: string): Buffer {
  try {
    return Buffer.from(value, "base64");
  } catch {
    throw new Error(`${label} must be base64 encoded.`);
  }
}

function decodeSymbol(symbol: unknown): string {
  if (typeof symbol === "string") {
    return symbol.replace(/\0+$/, "");
  }

  if (Array.isArray(symbol)) {
    return Buffer.from(symbol).toString("ascii").replace(/\0+$/, "");
  }

  return "";
}

function tokenEntryToConfig(entry: unknown): ProtocolTokenConfig | null {
  if (!entry || typeof entry !== "object") {
    return null;
  }

  const token = entry as {
    id?: unknown;
    tokenId?: unknown;
    mint?: unknown;
    symbol?: unknown;
    decimals?: unknown;
  };
  const tokenId = Number(token.id ?? token.tokenId);
  const decimals = Number(token.decimals);

  if (!Number.isInteger(tokenId) || tokenId < 0 || tokenId > 65_535) {
    return null;
  }
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 255) {
    return null;
  }

  return {
    tokenId,
    mint: String(token.mint),
    symbol: decodeSymbol(token.symbol),
    decimals,
  };
}

function deploymentTokens(config: unknown): unknown[] {
  if (!config || typeof config !== "object") {
    return [];
  }
  const tokens = (config as { tokens?: unknown }).tokens;
  return Array.isArray(tokens) ? tokens : [];
}

function loadDeploymentConfig(pathValue?: string): unknown {
  const candidates = [
    pathValue,
    process.env.AGON_PROTOCOL_DEVNET_DEPLOYMENT_CONFIG,
    resolve(process.cwd(), "config", "devnet-deployment.json"),
    resolve(process.cwd(), "..", "agon-protocol", "config", "devnet-deployment.json"),
  ].filter((value): value is string => Boolean(value));

  for (const candidate of candidates) {
    if (!existsSync(candidate)) {
      continue;
    }
    return JSON.parse(readFileSync(candidate, "utf8"));
  }

  return null;
}

export function resolveTokenByMint(
  tokens: unknown[],
  mint: PublicKey | string,
): ProtocolTokenConfig | null {
  const mintString = normalizePublicKey(mint).toBase58();
  for (const entry of tokens) {
    const token = tokenEntryToConfig(entry);
    if (token?.mint === mintString) {
      return token;
    }
  }
  return null;
}

export function resolveCanonicalDevnetUsdcToken(
  options: ResolveCanonicalDevnetUsdcTokenOptions = {},
): ProtocolTokenConfig {
  const env = options.env;
  const mint = envValue(env, "AGON_PROTOCOL_DEVNET_USDC_MINT")
    ?? OFFICIAL_DEVNET_USDC_MINT;
  const tokenIdOverride = envValue(env, "AGON_PROTOCOL_DEVNET_USDC_TOKEN_ID");

  if (mint !== OFFICIAL_DEVNET_USDC_MINT) {
    throw new Error(
      `Canonical devnet USDC mint must be ${OFFICIAL_DEVNET_USDC_MINT}.`,
    );
  }

  if (tokenIdOverride !== undefined) {
    const tokenId = Number(tokenIdOverride);
    if (!Number.isInteger(tokenId) || tokenId < 0 || tokenId > 65_535) {
      throw new Error("AGON_PROTOCOL_DEVNET_USDC_TOKEN_ID must be a u16 integer.");
    }
    return {
      tokenId,
      mint,
      symbol: OFFICIAL_USDC_SYMBOL,
      decimals: OFFICIAL_USDC_DECIMALS,
    };
  }

  const registryToken = options.registry
    ? resolveTokenByMint(options.registry.tokens ?? [], mint)
    : null;
  if (registryToken) {
    return registryToken;
  }

  const deployment = options.deploymentConfig
    ?? loadDeploymentConfig(options.deploymentConfigPath);
  const deployedToken = resolveTokenByMint(deploymentTokens(deployment), mint);
  if (deployedToken) {
    return deployedToken;
  }

  throw new Error(
    "Unable to resolve canonical devnet USDC token ID. Set AGON_PROTOCOL_DEVNET_USDC_TOKEN_ID or provide a deployment config containing the official devnet USDC mint.",
  );
}

export function calculateChannelHeadroom(
  channel: ChannelHeadroomInput,
  latestAcceptedCommitted: Amountish,
): ChannelHeadroom {
  const settledCumulative = toBigIntAmount(channel.settledCumulative);
  const lockedBalance = toBigIntAmount(channel.lockedBalance);
  const pendingUnlockAmount = channel.pendingUnlockAmount == null
    ? 0n
    : toBigIntAmount(channel.pendingUnlockAmount);
  const effectiveLocked = lockedBalance > pendingUnlockAmount
    ? lockedBalance - pendingUnlockAmount
    : 0n;
  const maxAuthorized = settledCumulative + effectiveLocked;
  const latestAccepted = toBigIntAmount(latestAcceptedCommitted);
  const remainingHeadroom = maxAuthorized > latestAccepted
    ? maxAuthorized - latestAccepted
    : 0n;

  return {
    settledCumulative,
    lockedBalance,
    pendingUnlockAmount,
    effectiveLocked,
    maxAuthorized,
    latestAcceptedCommitted: latestAccepted,
    remainingHeadroom,
  };
}

export function buildGatewayCommitmentPayload(
  params: BuildGatewayCommitmentPayloadParams,
): GatewayCommitmentPayload {
  const programId = normalizePublicKey(params.programId);
  const chainId = params.chainId ?? AGON_CHAIN_IDS[params.cluster ?? "devnet"];
  const messageDomain = params.messageDomain
    ? toBase64(params.messageDomain)
    : deriveMessageDomain(programId, chainId).toString("base64");

  return {
    version: 1,
    cluster: params.cluster ?? "devnet",
    programId: programId.toBase58(),
    chainId,
    messageDomain,
    tokenId: params.tokenId,
    tokenMint: params.tokenMint
      ? normalizePublicKey(params.tokenMint).toBase58()
      : OFFICIAL_DEVNET_USDC_MINT,
    tokenSymbol: params.tokenSymbol ?? OFFICIAL_USDC_SYMBOL,
    tokenDecimals: params.tokenDecimals ?? OFFICIAL_USDC_DECIMALS,
    payerId: params.payerId,
    payeeId: params.payeeId,
    committedAmount: toBigIntAmount(params.committedAmount).toString(),
    authorizedSettler: params.authorizedSettler
      ? params.authorizedSettler.toBase58()
      : null,
    signer: normalizePublicKey(params.signer).toBase58(),
    ...(params.signature ? { signature: toBase64(params.signature) } : {}),
  };
}

export function commitmentParamsFromGatewayPayload(
  payload: GatewayCommitmentPayload,
): CommitmentMessageParams {
  return {
    payerId: payload.payerId,
    payeeId: payload.payeeId,
    tokenId: payload.tokenId,
    committedAmount: payload.committedAmount,
    authorizedSettler: payload.authorizedSettler
      ? new PublicKey(payload.authorizedSettler)
      : null,
    messageDomain: fromBase64(payload.messageDomain, "messageDomain"),
  };
}

export function createGatewayCommitmentMessage(
  payload: GatewayCommitmentPayload,
): Buffer {
  return createCommitmentMessage(commitmentParamsFromGatewayPayload(payload));
}

export function encodeGatewayCommitmentEnvelope(
  payload: GatewayCommitmentPayload,
): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64");
}

export function decodeGatewayCommitmentEnvelope(
  envelope: string | GatewayCommitmentPayload,
): GatewayCommitmentPayload {
  if (typeof envelope !== "string") {
    return envelope;
  }

  const parsed = JSON.parse(Buffer.from(envelope, "base64").toString("utf8"));
  return parsed as GatewayCommitmentPayload;
}

export function verifyGatewayCommitmentEnvelope(
  envelope: string | GatewayCommitmentPayload,
): VerifyGatewayCommitmentEnvelopeResult {
  let payload: GatewayCommitmentPayload;
  try {
    payload = decodeGatewayCommitmentEnvelope(envelope);
  } catch (error) {
    return {
      ok: false,
      payload: {} as GatewayCommitmentPayload,
      messageBase64: "",
      error: error instanceof Error ? error.message : "Invalid envelope.",
    };
  }

  try {
    if (payload.version !== 1) {
      throw new Error("Unsupported gateway commitment version.");
    }
    if (!payload.signature) {
      throw new Error("Gateway commitment envelope is missing signature.");
    }

    const message = createGatewayCommitmentMessage(payload);
    const signature = fromBase64(payload.signature, "signature");
    const signer = new PublicKey(payload.signer);
    const ok = ed25519.verify(signature, message, signer.toBytes());

    return {
      ok,
      payload,
      messageBase64: message.toString("base64"),
      ...(ok ? {} : { error: "Signature verification failed." }),
    };
  } catch (error) {
    return {
      ok: false,
      payload,
      messageBase64: "",
      error: error instanceof Error ? error.message : "Invalid commitment.",
    };
  }
}

export function prepareCommitmentBundleSettlementPlan(params: {
  payeeId: number;
  tokenId: number;
  entries: Array<{
    payerId: number;
    payeeId?: number;
    tokenId?: number;
    channelState?: PublicKey | string;
    settledCumulative: Amountish;
    committedAmount: Amountish;
    signer?: PublicKey | string;
    signature?: Buffer | Uint8Array | string;
  }>;
}): CommitmentBundlePlan {
  const entries = params.entries.map((entry) => {
    const committedAmount = toBigIntAmount(entry.committedAmount);
    const settledCumulative = toBigIntAmount(entry.settledCumulative);
    if (committedAmount < settledCumulative) {
      throw new Error("Committed amount cannot be below settled cumulative.");
    }

    return {
      payerId: entry.payerId,
      payeeId: entry.payeeId ?? params.payeeId,
      tokenId: entry.tokenId ?? params.tokenId,
      ...(entry.channelState
        ? { channelState: normalizePublicKey(entry.channelState).toBase58() }
        : {}),
      committedAmount: committedAmount.toString(),
      deltaFromSettled: (committedAmount - settledCumulative).toString(),
      ...(entry.signer ? { signer: normalizePublicKey(entry.signer).toBase58() } : {}),
      ...(entry.signature ? { signature: toBase64(entry.signature) } : {}),
    };
  });

  const totalDeltaFromSettled = entries.reduce(
    (total, entry) => total + BigInt(entry.deltaFromSettled),
    0n,
  );

  return {
    payeeId: params.payeeId,
    tokenId: params.tokenId,
    count: entries.length,
    totalDeltaFromSettled: totalDeltaFromSettled.toString(),
    entries,
  };
}
