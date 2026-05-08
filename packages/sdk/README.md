# Ryvo Protocol SDK

TypeScript SDK for interacting with Ryvo Protocol.

This package exposes:

- the generated Anchor IDL and TypeScript program type
- PDA derivation helpers
- message-domain and signed-message builders
- Ed25519 pre-instruction helpers for unilateral and cooperative settlement
- a thin `RyvoClient` wrapper around the Anchor program

## Install

```bash
npm install @ryvonetwork/sdk
```

## Quick start

```ts
import * as anchor from "@coral-xyz/anchor";
import { RyvoClient } from "@ryvonetwork/sdk";

const provider = anchor.AnchorProvider.env();
const client = new RyvoClient({ provider });

const participantPda = client.participantAddress(provider.wallet.publicKey);
const participant = await client.fetchParticipant(provider.wallet.publicKey);
```

## Example: initialize a participant

```ts
await client
  .initializeParticipant({
    owner: owner.publicKey,
    feeRecipient,
  })
  .signers([owner])
  .rpc();
```

## Example: build and settle a commitment

```ts
import {
  createCommitmentMessage,
  createEd25519Instruction,
  deriveMessageDomain,
} from "@ryvonetwork/sdk";

const messageDomain = deriveMessageDomain(client.programId, 1);
const message = createCommitmentMessage({
  messageDomain,
  payerId: 1,
  payeeId: 2,
  tokenId: 1,
  committedAmount: 1_000_000n,
});

const ed25519Ix = createEd25519Instruction(owner, message);
```

## Notes

- By default the SDK uses the live program id embedded in the generated IDL.
- You can override the program id when constructing `RyvoClient`.
- The package name is `@ryvonetwork/sdk` and the initial release line is `0.5.x` while the protocol surface is still evolving.
