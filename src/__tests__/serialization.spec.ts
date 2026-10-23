// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { test, expect } from "bun:test";
import { AdaptiveCard, TextBlock, Image, Versions, SerializationContext } from "../index";

test("enum values serialize to their TS member name (like the client SDK)", () => {
    const text = new TextBlock("Hi");
    text.weight = 2; // TextWeight.Bolder
    text.color = 3; // TextColor.Accent

    const json = text.toJSON()!;

    expect(json.weight).toEqual("Bolder");
    expect(json.color).toEqual("Accent");
});

test("version gating drops properties newer than the target version", () => {
    const card = new AdaptiveCard();

    // Image.forceLoad is v1.6-only; targeting v1.5 must drop it.
    const image = new Image("https://example.com/i.png");
    image.forceLoad = true;
    card.addItem(image);

    const v15 = card.toJSON(new SerializationContext(Versions.v1_5))!.body as any[];
    expect(v15[0].forceLoad).toBeUndefined();

    const v16 = card.toJSON(new SerializationContext(Versions.v1_6))!.body as any[];
    expect(v16[0].forceLoad).toEqual(true);
});

test("pixel sizes serialize with a px suffix", () => {
    const image = new Image("https://example.com/i.png");
    image.pixelWidth = 120;

    expect(image.toJSON()!.width).toEqual("120px");
});
