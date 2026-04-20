import { PublicKey } from "@solana/web3.js";
import type { Amountish } from "./types.js";
import { toAnchorBn } from "./types.js";

export function getTokenBalance(participantData: any, tokenId: number) {
  const balance = participantData.tokenBalances.find(
    (entry: any) => entry.tokenId === tokenId,
  );

  if (!balance) {
    return {
      availableBalance: toAnchorBn(0),
      withdrawingBalance: toAnchorBn(0),
      withdrawalUnlockAt: toAnchorBn(0),
      withdrawalDestination: PublicKey.default,
    };
  }

  return balance;
}

export function nextCommitmentAmount(
  channelData: {
    settledCumulative?: Amountish;
  },
  delta: Amountish,
) {
  const current = channelData.settledCumulative ?? 0;
  return toAnchorBn(current).add(toAnchorBn(delta));
}
