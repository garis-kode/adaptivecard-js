// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as Enums from "./enums";
import { CardElement } from "./card-elements";
import { Action, ActionProperty } from "./actions";
import { EnumProperty, property, StringProperty, Versions } from "./serialization";

export type IconColor = Enums.TextColor;

export class Icon extends CardElement {
    //#region Schema

    static readonly nameProperty = new StringProperty(Versions.v1_6, "name");
    static readonly sizeProperty = new EnumProperty(
        Versions.v1_6,
        "size",
        Enums.IconSize,
        Enums.IconSize.Standard
    );
    static readonly styleProperty = new EnumProperty(
        Versions.v1_6,
        "style",
        Enums.IconStyle,
        Enums.IconStyle.Regular
    );
    static readonly colorProperty = new EnumProperty(
        Versions.v1_6,
        "color",
        Enums.TextColor,
        Enums.TextColor.Default
    );
    static readonly selectActionProperty = new ActionProperty(Versions.v1_6, "selectAction", [
        "Action.ShowCard"
    ]);

    @property(Icon.nameProperty)
    name?: string;

    @property(Icon.sizeProperty)
    size?: Enums.IconSize;

    @property(Icon.styleProperty)
    style?: Enums.IconStyle;

    @property(Icon.colorProperty)
    color?: IconColor;

    @property(Icon.selectActionProperty)
    selectAction?: Action;

    //#endregion

    constructor(name?: string) {
        super();

        if (name !== undefined) {
            this.name = name;
        }
    }

    getJsonTypeName(): string {
        return "Icon";
    }
}
