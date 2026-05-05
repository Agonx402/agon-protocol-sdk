/**
 * v6 yield-bearing helpers.
 *
 * The on-chain `YieldStrategy` account stores `user_index_q64` (Q64.64 fixed point) which maps
 * agUSDC shares -> USDC. This module exposes a USD-denominated UX:
 *
 *   * `usdcToAgShares(strategy, usdc)` — translate a USD amount the user just typed in into the
 *     share count the on-chain instructions consume.
 *   * `agSharesToUsdc(strategy, shares)` — display a stored share balance as the USD value the
 *     user expects to see.
 *   * `displayedUsdBalance({ available, withdrawing }, strategy)` — convenience for a single
 *     bucket entry.
 *   * `nextCommitmentAmountUsd({ settledCumulativeShares, deltaUsdc, strategy })` — compute the
 *     next cumulative-share amount to sign over so payments express user intent in USDC,
 *     translated into shares only at signing time.
 *
 * Yield-attribution semantics for cumulative commitments:
 *   * Commitments are signed in *shares*, so the recipient's index growth keeps applying to any
 *     un-settled cumulative balance. Resigning at a later time at the same USDC delta correctly
 *     adds a *fresh* share count (smaller than the previous one because the index has grown), so
 *     the recipient's accumulated yield on prior signed-but-unsettled balance is preserved.
 *   * The included `OutstandingCommitments` tracker memoises the cumulative shares that have
 *     already been signed and expected to be redeemed, so subsequent USD-denominated commitments
 *     never accidentally double-attribute or under-attribute yield.
 */

import * as anchor from "@coral-xyz/anchor";
import { Q64 } from "./constants.js";

export interface YieldStrategySnapshot {
  /** `user_index_q64` from on-chain. */
  userIndexQ64: bigint;
}

function toBigInt(value: anchor.BN | bigint | number | string): bigint {
  if (typeof value === "bigint") return value;
  if (typeof value === "number") return BigInt(value);
  if (typeof value === "string") return BigInt(value);
  return BigInt(value.toString());
}

/**
 * Translate `usdc` (in underlying base units, e.g. 1_000_000 = 1 USDC at 6 decimals) into the
 * agUSDC share count to credit. Floor division — same rounding as the on-chain handler — so the
 * SDK and program agree on share allocation to the lamport.
 */
export function usdcToAgShares(
  strategy: YieldStrategySnapshot,
  usdc: bigint | number | string | anchor.BN,
): bigint {
  const usdcBig = toBigInt(usdc);
  if (usdcBig === 0n) return 0n;
  const indexQ64 = toBigInt(strategy.userIndexQ64);
  if (indexQ64 === 0n) {
    throw new Error("YieldStrategy.user_index_q64 is zero; uninitialized strategy");
  }
  return (usdcBig * Q64) / indexQ64;
}

/**
 * Translate a stored agUSDC share count back to USDC base units. Floor division.
 */
export function agSharesToUsdc(
  strategy: YieldStrategySnapshot,
  shares: bigint | number | string | anchor.BN,
): bigint {
  const sharesBig = toBigInt(shares);
  if (sharesBig === 0n) return 0n;
  const indexQ64 = toBigInt(strategy.userIndexQ64);
  return (sharesBig * indexQ64) >> 64n;
}

/**
 * Sum a participant's available + withdrawing shares for an agUSDC bucket and return the USDC
 * value the user should see ("you have $X.XX usable"). Withdrawing balances are still owned by
 * the user and still earn yield until execute_withdrawal lands.
 */
export function displayedUsdBalance(
  bucketEntry: {
    availableBalance: anchor.BN | bigint | number | string;
    withdrawingBalance: anchor.BN | bigint | number | string;
  },
  strategy: YieldStrategySnapshot,
): bigint {
  const total = toBigInt(bucketEntry.availableBalance) +
    toBigInt(bucketEntry.withdrawingBalance);
  return agSharesToUsdc(strategy, total);
}

/**
 * Compute the next cumulative-share commitment amount for a USD-denominated payment.
 *
 * `settledCumulativeShares` is the most-recent cumulative committed amount on the channel (in
 * shares). `deltaUsdc` is the USD value the *new* payment expresses. We translate `deltaUsdc` to
 * shares at the *current* index and add it to the prior cumulative shares.
 *
 * Because shares are immutable once signed, any yield that accrues between the last signature and
 * settlement is automatically attributed to the recipient when the program reads the shares back
 * at settlement time and computes their USDC value at the then-current index.
 */
export function nextCommitmentAmountUsd(params: {
  settledCumulativeShares: anchor.BN | bigint | number | string;
  deltaUsdc: bigint | number | string | anchor.BN;
  strategy: YieldStrategySnapshot;
}): bigint {
  const prior = toBigInt(params.settledCumulativeShares);
  const newShares = usdcToAgShares(params.strategy, params.deltaUsdc);
  return prior + newShares;
}

/**
 * Tracker that remembers cumulative-share commitments per channel so a sender that re-signs the
 * "same" USDC delta after time passes (e.g. a recurring weekly subscription) generates the
 * correct fresh share count. It also exposes a check that a new signature monotonically increases
 * the cumulative — matching the on-chain `CommitmentAmountMustIncrease` constraint.
 */
export class OutstandingCommitments {
  private latest = new Map<string, bigint>();

  /** Read the most-recent cumulative shares on `channelKey`. Returns 0n if untracked. */
  get(channelKey: string): bigint {
    return this.latest.get(channelKey) ?? 0n;
  }

  /** Record a freshly signed cumulative-share amount. Throws if not strictly increasing. */
  record(channelKey: string, cumulativeShares: bigint): void {
    const prior = this.latest.get(channelKey) ?? 0n;
    if (cumulativeShares <= prior) {
      throw new Error(
        `Commitment must strictly increase cumulative shares (channel=${channelKey}, prior=${prior}, new=${cumulativeShares})`,
      );
    }
    this.latest.set(channelKey, cumulativeShares);
  }

  /**
   * Compute and record the next cumulative-share value for a USD-denominated commitment.
   * Convenience wrapper combining `nextCommitmentAmountUsd` + `record`.
   */
  nextCommitment(params: {
    channelKey: string;
    deltaUsdc: bigint | number | string | anchor.BN;
    strategy: YieldStrategySnapshot;
  }): bigint {
    const next = nextCommitmentAmountUsd({
      settledCumulativeShares: this.get(params.channelKey),
      deltaUsdc: params.deltaUsdc,
      strategy: params.strategy,
    });
    this.record(params.channelKey, next);
    return next;
  }
}

/**
 * Format a USDC amount (base units, 6 decimals) as a string for display. Convenience for demos.
 */
export function formatUsdc(amount: bigint, decimals: number = 6): string {
  const negative = amount < 0n;
  const abs = negative ? -amount : amount;
  const divisor = 10n ** BigInt(decimals);
  const whole = abs / divisor;
  const frac = abs % divisor;
  const fracStr = frac.toString().padStart(decimals, "0").replace(/0+$/, "");
  const wholeStr = whole.toString();
  const body = fracStr.length === 0 ? wholeStr : `${wholeStr}.${fracStr}`;
  return negative ? `-${body}` : body;
}
