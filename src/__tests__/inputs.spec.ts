// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { test, expect } from "bun:test";
import { TextInput, NumberInput, ChoiceSetInput, Choice, ToggleInput } from "../index";

test("TextInput serializes", () => {
    const input = new TextInput();
    input.id = "name";
    input.placeholder = "Your name";
    input.isMultiline = true;
    input.isRequired = true;

    expect(input.toJSON()).toEqual({
        type: "Input.Text",
        id: "name",
        placeholder: "Your name",
        isMultiline: true,
        isRequired: true
    });
});

test("NumberInput serializes numeric constraints", () => {
    const input = new NumberInput();
    input.id = "qty";
    input.min = 1;
    input.max = 10;
    input.defaultValue = 3;

    expect(input.toJSON()).toEqual({
        type: "Input.Number",
        id: "qty",
        min: 1,
        max: 10,
        value: 3
    });
});

test("ChoiceSetInput serializes choices", () => {
    const input = new ChoiceSetInput();
    input.id = "color";
    input.isMultiSelect = true;
    input.addChoice(new Choice("Red", "r"));
    input.addChoice(new Choice("Green", "g"));

    expect(input.toJSON()).toEqual({
        type: "Input.ChoiceSet",
        id: "color",
        isMultiSelect: true,
        choices: [
            { title: "Red", value: "r" },
            { title: "Green", value: "g" }
        ]
    });
});

test("ToggleInput omits default on/off values", () => {
    const input = new ToggleInput();
    input.id = "accept";
    input.title = "Accept terms";

    expect(input.toJSON()).toEqual({
        type: "Input.Toggle",
        id: "accept",
        title: "Accept terms"
    });
});
