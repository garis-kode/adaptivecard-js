// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { test, expect } from "bun:test";
import {
    AdaptiveCard,
    ColumnSet,
    Column,
    Container,
    FactSet,
    Fact,
    ImageSet,
    Image,
    TextBlock,
    OpenUrlAction
} from "../index";

test("ColumnSet serializes columns with widths", () => {
    const columnSet = new ColumnSet();

    const auto = new Column("auto");
    auto.addItem(new TextBlock("a"));

    const weighted = new Column(2);
    weighted.addItem(new TextBlock("b"));

    columnSet.addColumn(auto);
    columnSet.addColumn(weighted);

    expect(columnSet.toJSON()).toEqual({
        type: "ColumnSet",
        columns: [
            { type: "Column", width: "auto", items: [{ type: "TextBlock", text: "a" }] },
            { type: "Column", width: 2, items: [{ type: "TextBlock", text: "b" }] }
        ]
    });
});

test("FactSet serializes its facts", () => {
    const factSet = new FactSet();
    factSet.addFact(new Fact("Key", "Value"));

    expect(factSet.toJSON()).toEqual({
        type: "FactSet",
        facts: [{ title: "Key", value: "Value" }]
    });
});

test("ImageSet serializes its images", () => {
    const imageSet = new ImageSet();
    imageSet.addImage(new Image("https://example.com/a.png"));

    expect(imageSet.toJSON()).toEqual({
        type: "ImageSet",
        images: [{ type: "Image", url: "https://example.com/a.png" }]
    });
});

test("Container selectAction serializes", () => {
    const card = new AdaptiveCard();
    const container = new Container();
    const action = new OpenUrlAction();
    action.url = "https://example.com";
    container.selectAction = action;
    card.addItem(container);

    const body = card.toJSON()!.body as any[];
    expect(body[0].selectAction).toEqual({
        type: "Action.OpenUrl",
        url: "https://example.com"
    });
});
