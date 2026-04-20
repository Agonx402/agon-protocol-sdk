import { createHash } from "node:crypto";
import { ed25519 } from "@noble/curves/ed25519";
import {
  Ed25519Program,
  Keypair,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  ClearingRoundMessageParams,
  CommitmentMessageParams,
  type Amountish,
  toBigIntAmount,
} from "./types.js";

export function sha256Bytes(data: Buffer | Uint8Array): number[] {
  return [...createHash("sha256").update(data).digest()];
}

export function encodeCompactU64(value: Amountish): number[] {
  let remaining = toBigIntAmount(value);
  const bytes: number[] = [];

  do {
    let byte = Number(remaining & 0x7fn);
    remaining >>= 7n;
    if (remaining > 0n) {
      byte |= 0x80;
    }
    bytes.push(byte);
  } while (remaining > 0n);

  return bytes;
}

export function createCommitmentMessage(
  params: CommitmentMessageParams,
): Buffer {
  const flags = params.authorizedSettler ? 1 : 0;
  const body = [
    ...encodeCompactU64(params.payerId),
    ...encodeCompactU64(params.payeeId),
  ];
  const committedAmount = toBigIntAmount(params.committedAmount);
  const bodyParts: Buffer[] = [
    Buffer.from(body),
    Buffer.from(Uint8Array.of(params.tokenId & 0xff, (params.tokenId >> 8) & 0xff)),
    Buffer.from(encodeCompactU64(committedAmount)),
  ];

  if (params.authorizedSettler) {
    bodyParts.push(params.authorizedSettler.toBuffer());
  }

  return Buffer.concat([
    Buffer.from([0x01, 0x05]),
    Buffer.from(params.messageDomain),
    Buffer.from([flags]),
    ...bodyParts,
  ]);
}

export function createClearingRoundMessage(
  params: ClearingRoundMessageParams,
): Buffer {
  const dynamicParts: number[] = [];

  for (const block of params.blocks) {
    dynamicParts.push(...encodeCompactU64(block.participantId));
    dynamicParts.push(block.entries.length & 0xff);

    for (const entry of block.entries) {
      dynamicParts.push(entry.payeeRef & 0xff);
      dynamicParts.push(...encodeCompactU64(entry.targetCumulative));
    }
  }

  return Buffer.concat([
    Buffer.from([0x02, 0x04]),
    Buffer.from(params.messageDomain),
    Buffer.from(Uint8Array.of(params.tokenId & 0xff, (params.tokenId >> 8) & 0xff)),
    Buffer.from([params.blocks.length & 0xff]),
    Buffer.from(dynamicParts),
  ]);
}

export function createEd25519Instruction(
  signer: Keypair,
  message: Buffer,
): TransactionInstruction {
  return Ed25519Program.createInstructionWithPrivateKey({
    privateKey: signer.secretKey,
    message,
  });
}

export function createMultiSigEd25519Instruction(
  signers: Keypair[],
  message: Buffer,
): TransactionInstruction {
  const numSigs = signers.length;
  const headerSize = 2 + 14 * numSigs;
  const sigBlockSize = 32 + 64;
  const dataStart = headerSize;
  const messageOffset = dataStart + numSigs * sigBlockSize;
  const data = Buffer.alloc(messageOffset + message.length);

  data[0] = numSigs;
  data[1] = 0;

  for (let i = 0; i < numSigs; i += 1) {
    const publicKey = signers[i].publicKey.toBytes();
    const signature = ed25519.sign(message, signers[i].secretKey.slice(0, 32));
    const signatureOffset = dataStart + i * sigBlockSize + 32;
    const publicKeyOffset = dataStart + i * sigBlockSize;

    data.writeUInt16LE(signatureOffset, 2 + i * 14);
    data.writeUInt16LE(0xffff, 4 + i * 14);
    data.writeUInt16LE(publicKeyOffset, 6 + i * 14);
    data.writeUInt16LE(0xffff, 8 + i * 14);
    data.writeUInt16LE(messageOffset, 10 + i * 14);
    data.writeUInt16LE(message.length, 12 + i * 14);
    data.writeUInt16LE(0xffff, 14 + i * 14);

    Buffer.from(publicKey).copy(data, publicKeyOffset);
    Buffer.from(signature).copy(data, signatureOffset);
  }

  message.copy(data, messageOffset);

  return new TransactionInstruction({
    keys: [],
    programId: Ed25519Program.programId,
    data,
  });
}

export function createMultiMessageEd25519Instruction(
  entries: { signer: Keypair; message: Buffer }[],
): TransactionInstruction {
  const numSigs = entries.length;
  const headerSize = 2 + 14 * numSigs;
  let cursor = headerSize;
  const buffers: Buffer[] = [];
  const offsetRows: Array<{
    signatureOffset: number;
    publicKeyOffset: number;
    messageOffset: number;
    messageLength: number;
  }> = [];

  for (const entry of entries) {
    const publicKeyOffset = cursor;
    const signatureOffset = publicKeyOffset + 32;
    const messageOffset = signatureOffset + 64;
    const signature = ed25519.sign(
      entry.message,
      entry.signer.secretKey.slice(0, 32),
    );

    buffers.push(
      Buffer.from(entry.signer.publicKey.toBytes()),
      Buffer.from(signature),
      entry.message,
    );

    offsetRows.push({
      signatureOffset,
      publicKeyOffset,
      messageOffset,
      messageLength: entry.message.length,
    });

    cursor = messageOffset + entry.message.length;
  }

  const data = Buffer.alloc(cursor);
  data[0] = numSigs;
  data[1] = 0;

  offsetRows.forEach((row, index) => {
    const headerOffset = 2 + index * 14;
    data.writeUInt16LE(row.signatureOffset, headerOffset);
    data.writeUInt16LE(0xffff, headerOffset + 2);
    data.writeUInt16LE(row.publicKeyOffset, headerOffset + 4);
    data.writeUInt16LE(0xffff, headerOffset + 6);
    data.writeUInt16LE(row.messageOffset, headerOffset + 8);
    data.writeUInt16LE(row.messageLength, headerOffset + 10);
    data.writeUInt16LE(0xffff, headerOffset + 12);
  });

  let writeOffset = headerSize;
  for (const buffer of buffers) {
    buffer.copy(data, writeOffset);
    writeOffset += buffer.length;
  }

  return new TransactionInstruction({
    keys: [],
    programId: Ed25519Program.programId,
    data,
  });
}

export function createCrossInstructionMessageEd25519Instruction(
  signer: Keypair,
  message: Buffer,
  messageInstructionIndex: number,
): TransactionInstruction {
  const headerSize = 16;
  const publicKeyOffset = headerSize;
  const signatureOffset = publicKeyOffset + 32;
  const data = Buffer.alloc(signatureOffset + 64);
  const signature = ed25519.sign(message, signer.secretKey.slice(0, 32));

  data[0] = 1;
  data[1] = 0;
  data.writeUInt16LE(signatureOffset, 2);
  data.writeUInt16LE(0xffff, 4);
  data.writeUInt16LE(publicKeyOffset, 6);
  data.writeUInt16LE(0xffff, 8);
  data.writeUInt16LE(0, 10);
  data.writeUInt16LE(message.length, 12);
  data.writeUInt16LE(messageInstructionIndex, 14);

  Buffer.from(signer.publicKey.toBytes()).copy(data, publicKeyOffset);
  Buffer.from(signature).copy(data, signatureOffset);

  return new TransactionInstruction({
    keys: [],
    programId: Ed25519Program.programId,
    data,
  });
}
