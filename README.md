# Agon Protocol SDK

TypeScript SDK for the decentralized [Agon Protocol](https://agonx402.com) on Solana.

This repository publishes the protocol-facing SDK used to interact with the Agon onchain program:

| Package | Description | Install |
|---------|-------------|---------|
| [`@agonx402/sdk`](packages/sdk) | Protocol SDK — PDAs, message builders, settlement helpers, and `AgonClient` | `npm i @agonx402/sdk` |

## Quick start

```ts
import * as anchor from "@coral-xyz/anchor";
import { AgonClient } from "@agonx402/sdk";

const provider = anchor.AnchorProvider.env();
const client = new AgonClient({ provider });

const participant = await client.fetchParticipant(provider.wallet.publicKey);
```

## Local development

```bash
npm install
npm run build
npm run lint
```

## Publishing

The GitHub Actions workflow in [`.github/workflows/publish.yml`](.github/workflows/publish.yml) publishes the package under `packages/sdk` as `@agonx402/sdk`.

## License

MIT
