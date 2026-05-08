import { cpSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const files = [
  "ryvo_protocol.json",
  "mock_yield.json",
];

for (const file of files) {
  const source = resolve(`src/generated/${file}`);
  const destination = resolve(`dist/generated/${file}`);
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination);
}
