import { cpSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const source = resolve("src/generated/agon_protocol.json");
const destination = resolve("dist/generated/agon_protocol.json");

mkdirSync(dirname(destination), { recursive: true });
cpSync(source, destination);
