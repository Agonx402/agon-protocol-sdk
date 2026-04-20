import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

export type Amountish = bigint | number | string | { toString(): string };

export type ClearingRoundBlock = {
  participantId: number;
  entries: {
    payeeRef: number;
    targetCumulative: Amountish;
  }[];
};

export type CommitmentMessageParams = {
  payerId: number;
  payeeId: number;
  tokenId: number;
  committedAmount: Amountish;
  authorizedSettler?: PublicKey | null;
  messageDomain: Buffer | Uint8Array;
};

export type ClearingRoundMessageParams = {
  tokenId: number;
  messageDomain: Buffer | Uint8Array;
  blocks: ClearingRoundBlock[];
};

export type CreateAgonClientOptions = {
  provider: anchor.AnchorProvider;
  programId?: PublicKey;
};

export function toBigIntAmount(value: Amountish): bigint {
  const parsed =
    typeof value === "bigint"
      ? value
      : BigInt(typeof value === "number" ? value.toString() : value.toString());

  if (parsed < 0n) {
    throw new Error("Amounts must be unsigned.");
  }

  return parsed;
}

export function toAnchorBn(value: Amountish): anchor.BN {
  return new anchor.BN(toBigIntAmount(value).toString());
}
