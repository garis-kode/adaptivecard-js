import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const rootDir = join(import.meta.dir, "..");
const workDir = mkdtempSync(join(tmpdir(), "adaptivecard-pack-test-"));

function run(
  cmd: string,
  args: string[],
  cwd: string = rootDir,
): { stdout: string; stderr: string } {
  const result = spawnSync(cmd, args, {
    cwd,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    console.error(`Command failed: ${cmd} ${args.join(" ")}`);
    if (result.stdout) console.error(result.stdout);
    if (result.stderr) console.error(result.stderr);
    process.exit(result.status ?? 1);
  }
  return { stdout: result.stdout ?? "", stderr: result.stderr ?? "" };
}

try {
  // 1. Pack the tarball using `bun pm pack`
  console.log("1. Packing tarball...");
  run("bun", ["pm", "pack", "--destination", workDir], rootDir);

  const tarballs = readdirSync(workDir).filter((f) => f.endsWith(".tgz"));
  if (tarballs.length !== 1) {
    throw new Error(
      `Expected exactly 1 tarball, found: ${tarballs.join(", ")}`,
    );
  }
  const tarballPath = join(workDir, tarballs[0]!);
  const tarballSize = statSync(tarballPath).size;
  console.log(`   Packed ${tarballs[0]} (${tarballSize} bytes compressed)`);

  if (tarballSize > 500 * 1024) {
    throw new Error(
      `Tarball size ${tarballSize} bytes exceeds 500 KB limit (possible local file leak)`,
    );
  }

  // 2. Inspect tarball file list against explicit allowlist
  console.log("2. Verifying tarball file inventory...");
  const { stdout: tarListRaw } = run("tar", ["-ztf", tarballPath], workDir);
  const tarFiles = tarListRaw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.endsWith("/"));

  const allowedExact = new Set([
    "package/package.json",
    "package/README.md",
    "package/LICENSE",
    "package/CHANGELOG.md",
  ]);
  const allowedPrefixes = ["package/dist/esm/", "package/dist/cjs/"];

  for (const file of tarFiles) {
    const isAllowed =
      allowedExact.has(file) ||
      allowedPrefixes.some((prefix) => file.startsWith(prefix));
    if (!isAllowed) {
      throw new Error(`Disallowed file found in packed tarball: ${file}`);
    }
    if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
      throw new Error(`Raw TypeScript source found in packed tarball: ${file}`);
    }
  }

  const requiredFiles = [
    "package/package.json",
    "package/README.md",
    "package/LICENSE",
    "package/CHANGELOG.md",
    "package/dist/esm/package.json",
    "package/dist/esm/index.js",
    "package/dist/esm/index.d.ts",
    "package/dist/cjs/package.json",
    "package/dist/cjs/index.js",
    "package/dist/cjs/index.d.ts",
  ];
  for (const req of requiredFiles) {
    if (!tarFiles.includes(req)) {
      throw new Error(`Missing required file in packed tarball: ${req}`);
    }
  }
  console.log(`   Verified ${tarFiles.length} packaged files.`);

  // 3. Install tarball into isolated consumer directory
  console.log("3. Setting up isolated consumer project...");
  const consumerDir = join(workDir, "consumer");
  const pkgInstallDir = join(consumerDir, "node_modules", "adaptivecard-js");
  mkdirSync(pkgInstallDir, { recursive: true });
  run(
    "tar",
    ["-zxf", tarballPath, "--strip-components=1", "-C", pkgInstallDir],
    workDir,
  );

  writeFileSync(
    join(consumerDir, "package.json"),
    JSON.stringify(
      {
        name: "adaptivecard-consumer-smoke",
        private: true,
        type: "module",
        dependencies: {
          "adaptivecard-js": "1.0.0",
        },
      },
      null,
      2,
    ),
    "utf8",
  );

  const esmScript = `
import assert from 'node:assert/strict';
import {
  AdaptiveCard,
  OpenUrlAction,
  SubmitAction,
  SubmitActionData,
  TextBlock,
  TextSize,
  TextWeight,
} from 'adaptivecard-js';

const card = AdaptiveCard.make('1.6')
  .setProperty('constructor', 'preserved-ctor')
  .setProperty('__proto__', 'preserved-proto')
  .addTextBlock('Hello from Adaptive Cards!', (t) => {
    t.size(TextSize.Large).weight(TextWeight.Bolder);
  })
  .addActions(
    OpenUrlAction.make('https://adaptivecards.io/', 'Learn More'),
    SubmitAction.make('Send').data(
      SubmitActionData.make().custom('__proto__', 'inner-proto'),
    ),
  );

const obj = card.toObject();
assert.equal(obj.$schema, 'https://adaptivecards.io/schemas/adaptive-card.json');
assert.equal(obj.type, 'AdaptiveCard');
assert.equal(obj.version, '1.6');
assert.equal(Object.hasOwn(obj, 'constructor'), true);
assert.equal(obj.constructor, 'preserved-ctor');
assert.equal(Object.hasOwn(obj, '__proto__'), true);
assert.equal(obj['__proto__'], 'preserved-proto');
assert.equal(card.toJson().includes('"Hello from Adaptive Cards!"'), true);
`;

  const cjsScript = `
const assert = require('node:assert/strict');
const {
  AdaptiveCard,
  OpenUrlAction,
  TextSize,
  TextWeight,
} = require('adaptivecard-js');

const card = AdaptiveCard.make('1.6')
  .setProperty('constructor', 'preserved-ctor')
  .addTextBlock('Hello from Adaptive Cards!', (t) => {
    t.size(TextSize.Large).weight(TextWeight.Bolder);
  })
  .addActions(OpenUrlAction.make('https://adaptivecards.io/', 'Learn More'));

const obj = card.toObject();
assert.equal(obj.type, 'AdaptiveCard');
assert.equal(obj.version, '1.6');
assert.equal(Object.hasOwn(obj, 'constructor'), true);
assert.equal(obj.constructor, 'preserved-ctor');
`;

  writeFileSync(join(consumerDir, "smoke.mjs"), esmScript, "utf8");
  writeFileSync(join(consumerDir, "smoke.cjs"), cjsScript, "utf8");

  // 4. Execute runtime smoke tests in Node.js and Bun
  const candidateNodes = [
    process.env["NODE_BIN"],
    "/tmp/adaptivecard-npm-audit/node22/bin/node",
    "/tmp/adaptivecard-npm-audit/node24/bin/node",
    "node",
  ].filter((bin): bin is string => Boolean(bin));

  const testedNodes = new Set<string>();
  for (const nodeBin of candidateNodes) {
    if (nodeBin !== "node" && !existsSync(nodeBin)) {
      continue;
    }
    if (testedNodes.has(nodeBin)) {
      continue;
    }
    testedNodes.add(nodeBin);
    const { stdout: versionOut } = run(
      nodeBin,
      ["-e", "console.log('v' + process.versions.node)"],
      consumerDir,
    );
    console.log(
      `4. Running ESM & CJS smoke tests on ${nodeBin} (${versionOut.trim()})...`,
    );
    run(nodeBin, ["smoke.mjs"], consumerDir);
    run(nodeBin, ["smoke.cjs"], consumerDir);
  }

  console.log("5. Running Bun consumer smoke tests...");
  run("bun", ["smoke.mjs"], consumerDir);
  run("bun", ["smoke.cjs"], consumerDir);

  // 6. Standard TypeScript consumer verification (ESM .mts + CommonJS .cts, strict NodeNext, no allowImportingTsExtensions)
  console.log(
    "6. Running standard TypeScript (NodeNext) consumer verification...",
  );
  writeFileSync(
    join(consumerDir, "consumer-esm.mts"),
    `import {
  AdaptiveCard,
  OpenUrlAction,
  type TextBlock,
  TextSize,
  TextWeight,
} from 'adaptivecard-js';

export const card: AdaptiveCard = AdaptiveCard.make('1.6')
  .addTextBlock('Hello from Adaptive Cards!', (t: TextBlock) => {
    t.size(TextSize.Large).weight(TextWeight.Bolder);
  })
  .addActions(OpenUrlAction.make('https://adaptivecards.io/', 'Learn More'));
`,
    "utf8",
  );

  writeFileSync(
    join(consumerDir, "consumer-cjs.cts"),
    `import adaptiveCardPkg = require('adaptivecard-js');

const { AdaptiveCard, OpenUrlAction, TextSize, TextWeight } = adaptiveCardPkg;

export const card = AdaptiveCard.make('1.6')
  .addTextBlock('Hello from CJS TS!', (t) => {
    t.size(TextSize.Large).weight(TextWeight.Bolder);
  })
  .addActions(OpenUrlAction.make('https://adaptivecards.io/', 'Learn More'));
`,
    "utf8",
  );

  writeFileSync(
    join(consumerDir, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          strict: true,
          noEmit: true,
          skipLibCheck: false,
        },
        include: ["consumer-esm.mts", "consumer-cjs.cts"],
      },
      null,
      2,
    ),
    "utf8",
  );

  const candidateTscs = [
    join(rootDir, "node_modules", ".bin", "tsc"),
    "/tmp/adaptivecard-npm-audit/consumer-ts5/node_modules/.bin/tsc",
  ];
  for (const tscBin of candidateTscs) {
    if (!existsSync(tscBin)) continue;
    const { stdout: tscVer } = run(tscBin, ["--version"], consumerDir);
    console.log(`   Checking with ${tscBin} (${tscVer.trim()})...`);
    run(tscBin, ["-p", join(consumerDir, "tsconfig.json")], consumerDir);
  }

  console.log("All package artifact and consumer checks passed!");
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
