// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { test, expect } from "bun:test";
import {
    AdaptiveCard,
    TextBlock,
    OpenUrlAction,
    SubmitAction,
    ExecuteAction,
    ShowCardAction,
    ToggleVisibilityAction
} from "../index";

test("OpenUrlAction serializes", () => {
    const action = new OpenUrlAction();
    action.title = "Open";
    action.url = "https://example.com";

    expect(action.toJSON()).toEqual({
        type: "Action.OpenUrl",
        title: "Open",
        url: "https://example.com"
    });
});

test("SubmitAction serializes data", () => {
    const action = new SubmitAction();
    action.data = { verb: "ok", value: 1 };

    expect(action.toJSON()).toEqual({
        type: "Action.Submit",
        data: { verb: "ok", value: 1 }
    });
});

test("ExecuteAction serializes verb", () => {
    const action = new ExecuteAction();
    action.verb = "doThing";

    expect(action.toJSON()).toEqual({
        type: "Action.Execute",
        verb: "doThing"
    });
});

test("ToggleVisibilityAction serializes target elements", () => {
    const action = new ToggleVisibilityAction();
    action.addTargetElement("a");
    action.addTargetElement("b", false);

    expect(action.toJSON()).toEqual({
        type: "Action.ToggleVisibility",
        targetElements: ["a", { elementId: "b", isVisible: false }]
    });
});

test("ShowCardAction serializes a nested card without $schema", () => {
    const action = new ShowCardAction();
    action.title = "More";
    action.card.addItem(new TextBlock("Inner"));

    const json = action.toJSON()!;

    expect(json.type).toEqual("Action.ShowCard");
    expect(json.title).toEqual("More");
    expect(json.card.$schema).toBeUndefined();
    expect(json.card.type).toEqual("AdaptiveCard");
    expect(json.card.body).toEqual([{ type: "TextBlock", text: "Inner" }]);
});

test("card actions serialize into the actions array", () => {
    const card = new AdaptiveCard();
    const action = new OpenUrlAction();
    action.title = "Go";
    action.url = "https://example.com";
    card.addAction(action);

    expect(card.toJSON()!.actions).toEqual([
        { type: "Action.OpenUrl", title: "Go", url: "https://example.com" }
    ]);
});
