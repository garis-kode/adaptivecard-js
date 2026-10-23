// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { test, expect } from "bun:test";
import {
    AdaptiveCard,
    TextBlock,
    Container,
    SerializationContext,
    Versions,
    TextSize
} from "../index";

test("AdaptiveCard serializes a simple card", () => {
    const card = new AdaptiveCard();
    card.version = Versions.v1_5;

    const title = new TextBlock("Hello");
    title.wrap = true;
    title.size = TextSize.Large;
    card.addItem(title);

    expect(card.toJSON()).toEqual({
        $schema: "https://adaptivecards.io/schemas/adaptive-card.json",
        type: "AdaptiveCard",
        version: "1.5",
        body: [
            {
                type: "TextBlock",
                text: "Hello",
                wrap: true,
                // Numeric enums serialize to their TS member name, exactly like
                // the client SDK (Adaptive Cards parses enum values case-insensitively).
                size: "Large"
            }
        ]
    });
});

test("default values are omitted from output", () => {
    const card = new AdaptiveCard();
    const text = new TextBlock("Hi");
    // wrap defaults to false, spacing defaults to Default -> both omitted
    card.addItem(text);

    const body = card.toJSON()!.body as any[];

    expect(body[0]).toEqual({ type: "TextBlock", text: "Hi" });
});

test("nested containers serialize their items", () => {
    const card = new AdaptiveCard();
    const container = new Container();
    container.addItem(new TextBlock("Nested"));
    card.addItem(container);

    const body = card.toJSON()!.body as any[];

    expect(body[0]).toEqual({
        type: "Container",
        items: [{ type: "TextBlock", text: "Nested" }]
    });
});

test("explicit SerializationContext controls the emitted version", () => {
    const card = new AdaptiveCard();
    card.addItem(new TextBlock("Hi"));

    const json = card.toJSON(new SerializationContext(Versions.v1_2));

    expect(json!.version).toEqual("1.2");
});

test("adding a parented element throws", () => {
    const card = new AdaptiveCard();
    const text = new TextBlock("Hi");
    card.addItem(text);

    expect(() => new Container().addItem(text)).toThrow();
});
