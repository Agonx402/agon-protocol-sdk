import { PublicKey } from "@solana/web3.js";
import idlJson from "./generated/agon_protocol.json" with { type: "json" };

export const AGON_PROTOCOL_PROGRAM_ID = new PublicKey(idlJson.address);

export const AGON_CHAIN_IDS = {
  mainnet: 0,
  devnet: 1,
  testnet: 2,
  localnet: 3,
} as const;

export const OFFICIAL_DEVNET_USDC_MINT =
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";

export const OFFICIAL_USDC_SYMBOL = "USDC";
export const OFFICIAL_USDC_DECIMALS = 6;

export const MESSAGE_DOMAIN_TAG = Buffer.from(
  "agon-message-domain-v1",
  "utf8",
);

export const GLOBAL_CONFIG_SEED = "global-config";
export const TOKEN_REGISTRY_SEED = "token-registry";
export const PARTICIPANT_SEED = "participant";
export const VAULT_TOKEN_ACCOUNT_SEED = "vault-token-account";
export const CHANNEL_V2_SEED = "channel-v2";

export const BPF_LOADER_UPGRADEABLE_PROGRAM_ID = new PublicKey(
  "BPFLoaderUpgradeab1e11111111111111111111111",
);

export const SPL_TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
);

export const INBOUND_CHANNEL_POLICY = {
  Permissionless: 0,
  ConsentRequired: 1,
  Disabled: 2,
} as const;
