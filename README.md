<h1 align="center">garis-kode/adaptivecard-js</h1>

<p align="center">
    <strong>Microsoft Adaptive Cards builder for TypeScript / JavaScript</strong>
</p>

<p align="center">
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="Software License"></a>
    <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D20-339933.svg?style=flat-square" alt="Node.js"></a>
    <a href="https://bun.sh"><img src="https://img.shields.io/badge/bun-%3E%3D1.0-f9f1e1.svg?style=flat-square" alt="Bun"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5%2B%20%7C%207%2B-3178C6.svg?style=flat-square" alt="TypeScript"></a>
</p>

---

## Overview

A fluent, fully typed TypeScript/JavaScript builder for Microsoft Adaptive Cards (v1.6), supporting both ESM and CommonJS

---

## Installation

Install the package via npm, pnpm, yarn, or Bun:

```bash
npm install adaptivecard-js
# or
bun add adaptivecard-js
```

---

## Quick Start

Create an Adaptive Card with a formatted text block and an action button, and export to JSON:

```ts
import {
  AdaptiveCard,
  OpenUrlAction,
  TextBlock,
  TextSize,
  TextWeight,
} from "adaptivecard-js";

const card = AdaptiveCard.make("1.6") // Version defaults to '1.6' if omitted
  .addTextBlock("Hello from Adaptive Cards!", (t: TextBlock) => {
    t.size(TextSize.Large).weight(TextWeight.Bolder);
  })
  .addActions(OpenUrlAction.make("https://adaptivecards.io/", "Learn More"));

// Output JSON string
console.log(card.toJson());
```

### Expected Output

```json
{
  "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.6",
  "body": [
    {
      "type": "TextBlock",
      "text": "Hello from Adaptive Cards!",
      "size": "Large",
      "weight": "Bolder"
    }
  ],
  "actions": [
    {
      "type": "Action.OpenUrl",
      "url": "https://adaptivecards.io/",
      "title": "Learn More"
    }
  ]
}
```

---

## Documentation

For comprehensive schema specifications, interactive designer, and payload samples, refer to the official [Adaptive Cards Documentation](https://adaptivecards.microsoft.com/).

---

## Changelog

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). For a complete record of updates and release notes, visit the [GitHub Releases](https://github.com/garis-kode/adaptivecard-js/releases) page.

---

## Development

Install development dependencies with `bun install`.

- `bun test` runs the unit and regression test suite.
- `bun run typecheck` checks TypeScript types using `bun --check`.
- `bun run build` compiles dual ESM (`dist/esm`) and CommonJS (`dist/cjs`) outputs and `.d.ts` declarations.
- `bun run fmt` formats repository files (`bun run fmt:check` verifies formatting).
- `bun run check` runs formatting check, type checking, unit tests, and build.
- `bun run test:pack` packs the release tarball and verifies file allowlist, Node ESM/CJS imports, Bun execution, and TypeScript (`NodeNext`) consumer compilation.

---

## License & Credits

- **License**: Released under the [MIT License](LICENSE). Copyright &copy; 2026 [Garis Kode](https://github.com/garis-kode).
- **Adaptive Cards Specification**: Adaptive Cards is an open card exchange format developed by Microsoft. Learn more at [Adaptive Cards](https://adaptivecards.microsoft.com).
