# adaptivecard-node

A lightweight, **server-side** builder for [Adaptive Card](https://adaptivecards.io) JSON.

The existing `adaptivecards` package in this monorepo is a client-side library: its
object model is fused with an HTML/DOM rendering layer. `adaptivecard-node` re-implements
only the declarative **serialization core** and **object model** of that SDK — the same
`SerializableObject` / `PropertyDefinition` / `@property` patterns — with **zero DOM
dependencies**, so you can author Adaptive Card JSON on a Node.js server.

- Class-based authoring API that mirrors the client SDK (`new AdaptiveCard()`,
  `new TextBlock("Hi")`, `card.toJSON()`).
- Full schema coverage, **v1.0 – v1.6**: all elements, inputs, and actions.
- Build-only: object → JSON via `toJSON()`. (Property definitions already declare the
  logic needed to add JSON → object parsing later.)

## Install / build

Built and tested with [Bun](https://bun.sh). From this package directory:

```bash
bun install
bun run build   # bun build -> dist/ (ESM + CJS) + tsc -> dist/*.d.ts
bun test        # bun's built-in test runner
```

## Usage

```ts
import { AdaptiveCard, TextBlock, Versions, TextSize, OpenUrlAction } from "adaptivecard-node";

const card = new AdaptiveCard();
card.version = Versions.v1_5;

const title = new TextBlock("Hello world");
title.size = TextSize.Large;
title.wrap = true;
card.addItem(title);

const open = new OpenUrlAction();
open.title = "Learn more";
open.url = "https://adaptivecards.io";
card.addAction(open);

console.log(JSON.stringify(card.toJSON(), null, 2));
```

### Controlling the target version

`card.toJSON()` serializes to `card.version` by default, omitting any properties that
require a newer schema version. Pass an explicit context to override:

```ts
import { SerializationContext, Versions } from "adaptivecard-node";

card.toJSON(new SerializationContext(Versions.v1_4));
```

## Scope

Build-only today. Out of scope (but enabled by the design): JSON → object parsing,
HTML rendering (see `adaptivecards`), and data-binding/templating (see
`adaptivecards-templating`).
