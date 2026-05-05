import { PublicKey } from "@solana/web3.js";
import idlJson from "./generated/agon_protocol.json" with { type: "json" };
import mockYieldIdlJson from "./generated/mock_yield.json" with { type: "json" };

export const AGON_PROTOCOL_PROGRAM_ID = new PublicKey(idlJson.address);
export const MOCK_YIELD_PROGRAM_ID = new PublicKey(mockYieldIdlJson.address);

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

/**
 * v6 default token id for the protocol-managed yield-bearing wrapper (agUSDC).
 * USD-denominated UX: SDK helpers translate USDC amounts <-> agUSDC shares using `user_index_q64`
 * read from the on-chain `YieldStrategy`.
 */
export const AG_USDC_TOKEN_ID = 1;
export const AG_USDC_SYMBOL = "agUSDC";

export const MESSAGE_DOMAIN_TAG = Buffer.from(
  "agon-message-domain-v1",
  "utf8",
);

export const GLOBAL_CONFIG_SEED = "global-config";
export const TOKEN_REGISTRY_SEED = "token-registry";
export const PARTICIPANT_SEED = "participant";
export const VAULT_TOKEN_ACCOUNT_SEED = "vault-token-account";
export const CHANNEL_V2_SEED = "channel-v2";

// v6 yield-bearing seeds.
export const YIELD_STRATEGY_SEED = "yield-strategy";
export const YIELD_SHARE_VAULT_SEED = "yield-share-vault";
export const RESERVE_SEED = "reserve";
export const SHARE_MINT_SEED = "share-mint";
export const LIQUIDITY_VAULT_SEED = "liquidity-vault";

/** Q64.64 unit (`1.0`). Used for `user_index_q64` math on the SDK side. */
export const Q64 = 1n << 64n;

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

export const TOKEN_KIND = {
  Plain: 0,
  YieldBearing: 1,
} as const;
