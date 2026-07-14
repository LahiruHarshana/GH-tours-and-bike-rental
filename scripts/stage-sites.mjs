import { cpSync, copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";

const output = ".open-next";
const dist = "dist";

if (!existsSync(`${output}/worker.js`)) {
  throw new Error("OpenNext did not produce .open-next/worker.js");
}

rmSync(dist, { force: true, recursive: true });
mkdirSync(dist, { recursive: true });
cpSync(output, `${dist}/server`, { recursive: true });
copyFileSync(`${output}/worker.js`, `${dist}/server/index.js`);

if (existsSync(`${output}/assets`)) {
  cpSync(`${output}/assets`, `${dist}/client`, { recursive: true });
}

mkdirSync(`${dist}/.openai`, { recursive: true });
copyFileSync(".openai/hosting.json", `${dist}/.openai/hosting.json`);
