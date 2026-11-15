import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = join(import.meta.dir, "..");
const distDir = join(rootDir, "dist");

rmSync(distDir, { recursive: true, force: true });

function runTsc(project: string): void {
  const result = spawnSync("bunx", ["tsc", "-p", project], {
    cwd: rootDir,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

runTsc("tsconfig.esm.json");
runTsc("tsconfig.cjs.json");

mkdirSync(join(distDir, "esm"), { recursive: true });
mkdirSync(join(distDir, "cjs"), { recursive: true });

writeFileSync(
  join(distDir, "esm", "package.json"),
  `${JSON.stringify({ type: "module" }, null, 2)}\n`,
  "utf8",
);

writeFileSync(
  join(distDir, "cjs", "package.json"),
  `${JSON.stringify({ type: "commonjs" }, null, 2)}\n`,
  "utf8",
);
