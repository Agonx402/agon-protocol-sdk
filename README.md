# Ryvo Protocol SDK

TypeScript SDK for the decentralized [Ryvo Protocol](https://ryvo.network) on Solana.

This repository publishes the protocol-facing SDK used to interact with the Ryvo onchain program:

| Package | Description | Install |
|---------|-------------|---------|
| [`@ryvonetwork/sdk`](packages/sdk) | Protocol SDK — PDAs, message builders, settlement helpers, and `RyvoClient` | `npm i @ryvonetwork/sdk` |

## Quick start

```ts
import * as anchor from "@coral-xyz/anchor";
import { RyvoClient } from "@ryvonetwork/sdk";

const provider = anchor.AnchorProvider.env();
const client = new RyvoClient({ provider });

const participant = await client.fetchParticipant(provider.wallet.publicKey);
```

## Local development

```bash
npm install
npm run build
npm run lint
```

## Publishing

The GitHub Actions workflow in [`.github/workflows/publish.yml`](.github/workflows/publish.yml) publishes the package under `packages/sdk` as `@ryvonetwork/sdk`.

## License

MIT
