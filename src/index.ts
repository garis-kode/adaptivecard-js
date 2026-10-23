// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Public API surface for the server-side Adaptive Card JSON builder.
export * from "./enums";
export * from "./shared";
export * from "./serialization";
export * from "./host-capabilities";
export * from "./card-object";
export * from "./actions";
export * from "./card-elements";
export * from "./table";
export * from "./icon";
export * from "./carousel";
export { GlobalRegistry, CardObjectRegistry } from "./registry";
export type { ITypeRegistration } from "./registry";

import { Versions } from "./serialization";
import { GlobalRegistry } from "./registry";
import {
    Container,
    TextBlock,
    RichTextBlock,
    TextRun,
    Image,
    ImageSet,
    Media,
    FactSet,
    ColumnSet,
    ActionSet,
    TextInput,
    DateInput,
    TimeInput,
    NumberInput,
    ChoiceSetInput,
    ToggleInput,
    ShowCardAction
} from "./card-elements";
import { Table } from "./table";
import { Icon } from "./icon";
import { Carousel } from "./carousel";
import {
    OpenUrlAction,
    SubmitAction,
    ToggleVisibilityAction,
    ExecuteAction
} from "./actions";

// Register default element types.
GlobalRegistry.defaultElements.register("Container", Container);
GlobalRegistry.defaultElements.register("TextBlock", TextBlock);
GlobalRegistry.defaultElements.register("RichTextBlock", RichTextBlock, Versions.v1_2);
GlobalRegistry.defaultElements.register("TextRun", TextRun, Versions.v1_2);
GlobalRegistry.defaultElements.register("Image", Image);
GlobalRegistry.defaultElements.register("ImageSet", ImageSet);
GlobalRegistry.defaultElements.register("Media", Media, Versions.v1_1);
GlobalRegistry.defaultElements.register("FactSet", FactSet);
GlobalRegistry.defaultElements.register("ColumnSet", ColumnSet);
GlobalRegistry.defaultElements.register("ActionSet", ActionSet, Versions.v1_2);
GlobalRegistry.defaultElements.register("Input.Text", TextInput);
GlobalRegistry.defaultElements.register("Input.Date", DateInput);
GlobalRegistry.defaultElements.register("Input.Time", TimeInput);
GlobalRegistry.defaultElements.register("Input.Number", NumberInput);
GlobalRegistry.defaultElements.register("Input.ChoiceSet", ChoiceSetInput);
GlobalRegistry.defaultElements.register("Input.Toggle", ToggleInput);
GlobalRegistry.defaultElements.register("Table", Table, Versions.v1_5);
GlobalRegistry.defaultElements.register("Icon", Icon, Versions.v1_6);
GlobalRegistry.defaultElements.register("Carousel", Carousel, Versions.v1_6);

// Register default action types.
GlobalRegistry.defaultActions.register(OpenUrlAction.JsonTypeName, OpenUrlAction);
GlobalRegistry.defaultActions.register(SubmitAction.JsonTypeName, SubmitAction);
GlobalRegistry.defaultActions.register(ShowCardAction.JsonTypeName, ShowCardAction);
GlobalRegistry.defaultActions.register(
    ToggleVisibilityAction.JsonTypeName,
    ToggleVisibilityAction,
    Versions.v1_2
);
GlobalRegistry.defaultActions.register(ExecuteAction.JsonTypeName, ExecuteAction, Versions.v1_4);
