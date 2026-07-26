import { cpSync, copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const output = ".open-next";
const dist = "dist";

function materializeSymlinks(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) {
      const target = realpathSync(path);
      rmSync(path, { force: true, recursive: true });
      cpSync(target, path, { dereference: true, recursive: true });
    } else if (stat.isDirectory()) {
      materializeSymlinks(path);
    }
  }
}

if (!existsSync(`${output}/worker.js`)) {
  throw new Error("OpenNext did not produce .open-next/worker.js");
}

rmSync(dist, { force: true, recursive: true });
mkdirSync(dist, { recursive: true });
cpSync(output, `${dist}/server`, { dereference: true, recursive: true });
materializeSymlinks(`${dist}/server`);
copyFileSync(`${output}/worker.js`, `${dist}/server/index.js`);

// Next ships a multi-megabyte font metric database used by build-time font
// tooling. Our fonts are already compiled into static CSS, so the runtime only
// needs a valid fallback object. Keeping the full database can push a Worker
// deployment over its upload limit.
const fontMetrics = `${dist}/server/server-functions/default/node_modules/next/dist/server/capsize-font-metrics.json`;
if (existsSync(fontMetrics)) {
  writeFileSync(fontMetrics, "{}");
}

if (existsSync(`${output}/assets`)) {
  cpSync(`${output}/assets`, `${dist}/client`, { dereference: true, recursive: true });
  // Static files are uploaded from dist/client. Leaving a second copy inside
  // dist/server makes the same images count against the Worker upload limit.
  rmSync(`${dist}/server/assets`, { force: true, recursive: true });
}

mkdirSync(`${dist}/.openai`, { recursive: true });
copyFileSync(".openai/hosting.json", `${dist}/.openai/hosting.json`);
