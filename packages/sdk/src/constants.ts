import { PublicKey } from "@solana/web3.js";
import idlJson from "./generated/ryvo_protocol.json" with { type: "json" };
import mockYieldIdlJson from "./generated/mock_yield.json" with { type: "json" };

export const RYVO_PROTOCOL_PROGRAM_ID = new PublicKey(idlJson.address);
export const MOCK_YIELD_PROGRAM_ID = new PublicKey(mockYieldIdlJson.address);

export const RYVO_CHAIN_IDS = {
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
 * v7 default token ids:
 * - `USDC_TOKEN_ID = 1` — plain USDC bucket (no yield).
 * - `RY_USDC_TOKEN_ID = 2` — yield-bearing wrapper (ryUSDC). USD-denominated UX: SDK helpers
 *   translate USDC amounts <-> ryUSDC shares using `user_index_q64` read from the on-chain
 *   `YieldStrategy`.
 *
 * v7 introduces `opt_in_yield` / `opt_out_yield` for moving balances between these two buckets
 * without touching the user's wallet ATA.
 */
export const USDC_TOKEN_ID = 1;
export const USDC_SYMBOL = "USDC";
export const RY_USDC_TOKEN_ID = 2;
export const RY_USDC_SYMBOL = "ryUSDC";

export const MESSAGE_DOMAIN_TAG = Buffer.from(
  "ryvo-message-domain-v1",
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
