import agonProtocolIdl from "./generated/agon_protocol.json" with { type: "json" };

export { AgonClient, createAgonProgram, encodeSymbol, getAgonIdl } from "./client.js";
export {
  AGON_CHAIN_IDS,
  AGON_PROTOCOL_PROGRAM_ID,
  BPF_LOADER_UPGRADEABLE_PROGRAM_ID,
  CHANNEL_V2_SEED,
  GLOBAL_CONFIG_SEED,
  INBOUND_CHANNEL_POLICY,
  MESSAGE_DOMAIN_TAG,
  OFFICIAL_DEVNET_USDC_MINT,
  OFFICIAL_USDC_DECIMALS,
  OFFICIAL_USDC_SYMBOL,
  PARTICIPANT_SEED,
  SPL_TOKEN_PROGRAM_ID,
  TOKEN_REGISTRY_SEED,
  VAULT_TOKEN_ACCOUNT_SEED,
} from "./constants.js";
export { getTokenBalance, nextCommitmentAmount } from "./accounts.js";
export {
  buildGatewayCommitmentPayload,
  calculateChannelHeadroom,
  commitmentParamsFromGatewayPayload,
  createGatewayCommitmentMessage,
  decodeGatewayCommitmentEnvelope,
  encodeGatewayCommitmentEnvelope,
  prepareCommitmentBundleSettlementPlan,
  resolveCanonicalDevnetUsdcToken,
  resolveTokenByMint,
  verifyGatewayCommitmentEnvelope,
  type BuildGatewayCommitmentPayloadParams,
  type ChannelHeadroom,
  type ChannelHeadroomInput,
  type CommitmentBundlePlan,
  type CommitmentBundlePlanEntry,
  type GatewayCommitmentPayload,
  type ProtocolCluster,
  type ProtocolTokenConfig,
  type ResolveCanonicalDevnetUsdcTokenOptions,
  type VerifyGatewayCommitmentEnvelopeResult,
} from "./protocol.js";
export {
  createClearingRoundMessage,
  createCommitmentMessage,
  createCrossInstructionMessageEd25519Instruction,
  createEd25519Instruction,
  createMultiMessageEd25519Instruction,
  createMultiSigEd25519Instruction,
  encodeCompactU64,
  sha256Bytes,
} from "./messages.js";
export {
  deriveMessageDomain,
  findChannelPda,
  findGlobalConfigPda,
  findParticipantPda,
  findProgramDataPda,
  findTokenRegistryPda,
  findVaultTokenAccountPda,
} from "./pdas.js";
export {
  toAnchorBn,
  toBigIntAmount,
  type Amountish,
  type ClearingRoundBlock,
  type ClearingRoundMessageParams,
  type CommitmentMessageParams,
  type CreateAgonClientOptions,
} from "./types.js";
export { agonProtocolIdl as AGON_PROTOCOL_IDL };
export type { AgonProtocol } from "./generated/agon_protocol.js";
