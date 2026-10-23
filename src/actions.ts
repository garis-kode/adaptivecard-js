// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as Enums from "./enums";
import { CardObject, ValidationResults } from "./card-object";
import { Strings } from "./strings";
import {
    BaseSerializationContext,
    BoolProperty,
    CustomProperty,
    EnumProperty,
    PropertyBag,
    PropertyDefinition,
    property,
    SerializableObject,
    StringProperty,
    ValueSetProperty,
    Version,
    Versions
} from "./serialization";
import * as Utils from "./utils";

// Property definition that serializes a nested Action (e.g. `selectAction`,
// `inlineAction`). Parse is a no-op in this authoring-only SDK.
export class ActionProperty extends PropertyDefinition {
    parse(
        _sender: SerializableObject,
        _source: PropertyBag,
        _context: BaseSerializationContext
    ): Action | undefined {
        return undefined;
    }

    toJSON(
        _sender: SerializableObject,
        target: PropertyBag,
        value: Action | undefined,
        context: BaseSerializationContext
    ) {
        context.serializeValue(
            target,
            this.name,
            value ? value.toJSON(context) : undefined,
            undefined,
            true
        );
    }

    constructor(
        readonly targetVersion: Version,
        readonly name: string,
        readonly forbiddenActionTypes: string[] = []
    ) {
        super(targetVersion, name, undefined);
    }
}

export abstract class Action extends CardObject {
    //#region Schema

    static readonly titleProperty = new StringProperty(Versions.v1_0, "title");
    static readonly iconUrlProperty = new StringProperty(Versions.v1_1, "iconUrl");
    static readonly styleProperty = new ValueSetProperty(
        Versions.v1_2,
        "style",
        [
            { value: Enums.ActionStyle.Default },
            { value: Enums.ActionStyle.Positive },
            { value: Enums.ActionStyle.Destructive }
        ],
        Enums.ActionStyle.Default
    );
    static readonly modeProperty = new ValueSetProperty(
        Versions.v1_5,
        "mode",
        [{ value: Enums.ActionMode.Primary }, { value: Enums.ActionMode.Secondary }],
        Enums.ActionMode.Primary
    );
    static readonly tooltipProperty = new StringProperty(Versions.v1_5, "tooltip");
    static readonly isEnabledProperty = new BoolProperty(Versions.v1_5, "isEnabled", true);
    static readonly roleProperty = new EnumProperty(Versions.v1_6, "role", Enums.ActionRole);

    @property(Action.titleProperty)
    title?: string;

    @property(Action.iconUrlProperty)
    iconUrl?: string;

    @property(Action.styleProperty)
    style: string = Enums.ActionStyle.Default;

    @property(Action.modeProperty)
    mode: string = Enums.ActionMode.Primary;

    @property(Action.tooltipProperty)
    tooltip?: string;

    @property(Action.isEnabledProperty)
    isEnabled: boolean = true;

    @property(Action.roleProperty)
    role?: Enums.ActionRole;

    //#endregion

    abstract getJsonTypeName(): string;
}

export class OpenUrlAction extends Action {
    //#region Schema

    static readonly urlProperty = new StringProperty(Versions.v1_0, "url");

    @property(OpenUrlAction.urlProperty)
    url?: string;

    //#endregion

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static readonly JsonTypeName: "Action.OpenUrl" = "Action.OpenUrl";

    getJsonTypeName(): string {
        return OpenUrlAction.JsonTypeName;
    }

    internalValidateProperties(context: ValidationResults) {
        super.internalValidateProperties(context);

        if (!this.url) {
            context.addFailure(
                this,
                Enums.ValidationEvent.PropertyCantBeNull,
                Strings.errors.propertyMustBeSet("url")
            );
        }
    }
}

export abstract class SubmitActionBase extends Action {
    //#region Schema

    static readonly dataProperty = new PropertyDefinition(Versions.v1_0, "data");
    static readonly associatedInputsProperty = new CustomProperty<"auto" | "none" | undefined>(
        Versions.v1_3,
        "associatedInputs",
        (
            _sender: SerializableObject,
            prop: PropertyDefinition,
            source: PropertyBag,
            _context: BaseSerializationContext
        ) => {
            const value = source[prop.name];

            if (value !== undefined && typeof value === "string") {
                return value.toLowerCase() === "none" ? "none" : "auto";
            }

            return undefined;
        },
        (
            _sender: SerializableObject,
            prop: PropertyDefinition,
            target: PropertyBag,
            value: "auto" | "none" | undefined,
            context: BaseSerializationContext
        ) => {
            context.serializeValue(target, prop.name, value);
        }
    );
    static readonly disabledUnlessAssociatedInputsChangeProperty = new BoolProperty(
        Versions.v1_6,
        "disabledUnlessAssociatedInputsChange",
        false
    );

    @property(SubmitActionBase.dataProperty)
    data?: PropertyBag;

    @property(SubmitActionBase.associatedInputsProperty)
    associatedInputs?: "auto" | "none";

    @property(SubmitActionBase.disabledUnlessAssociatedInputsChangeProperty)
    disabledUnlessAssociatedInputsChange: boolean = false;

    //#endregion
}

export class SubmitAction extends SubmitActionBase {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    static readonly JsonTypeName: "Action.Submit" = "Action.Submit";

    getJsonTypeName(): string {
        return SubmitAction.JsonTypeName;
    }
}

export class ExecuteAction extends SubmitActionBase {
    //#region Schema

    static readonly verbProperty = new StringProperty(Versions.v1_4, "verb");

    @property(ExecuteAction.verbProperty)
    verb?: string;

    //#endregion

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static readonly JsonTypeName: "Action.Execute" = "Action.Execute";

    getJsonTypeName(): string {
        return ExecuteAction.JsonTypeName;
    }
}

export class ToggleVisibilityAction extends Action {
    //#region Schema

    static readonly targetElementsProperty = new CustomProperty<PropertyBag>(
        Versions.v1_2,
        "targetElements",
        (
            _sender: SerializableObject,
            prop: PropertyDefinition,
            source: PropertyBag,
            _context: BaseSerializationContext
        ) => {
            const result: PropertyBag = {};

            if (Array.isArray(source[prop.name])) {
                for (const item of source[prop.name]) {
                    if (typeof item === "string") {
                        result[item] = undefined;
                    } else if (typeof item === "object") {
                        const elementId = item["elementId"];

                        if (typeof elementId === "string") {
                            result[elementId] = Utils.parseBool(item["isVisible"]);
                        }
                    }
                }
            }

            return result;
        },
        (
            _sender: SerializableObject,
            prop: PropertyDefinition,
            target: PropertyBag,
            value: PropertyBag,
            context: BaseSerializationContext
        ) => {
            const targetElements: any[] = [];

            for (const id of Object.keys(value)) {
                if (typeof value[id] === "boolean") {
                    targetElements.push({
                        elementId: id,
                        isVisible: value[id]
                    });
                } else {
                    targetElements.push(id);
                }
            }

            context.serializeArray(target, prop.name, targetElements);
        },
        {},
        () => {
            return {};
        }
    );

    @property(ToggleVisibilityAction.targetElementsProperty)
    targetElements: { [key: string]: any } = {};

    //#endregion

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static readonly JsonTypeName: "Action.ToggleVisibility" = "Action.ToggleVisibility";

    getJsonTypeName(): string {
        return ToggleVisibilityAction.JsonTypeName;
    }

    addTargetElement(elementId: string, isVisible: boolean | undefined = undefined) {
        this.targetElements[elementId] = isVisible;
    }
}
