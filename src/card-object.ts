// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as Enums from "./enums";
import { Strings } from "./strings";
import { Dictionary } from "./shared";
import { HostCapabilities } from "./host-capabilities";
import {
    Versions,
    property,
    SerializableObject,
    StringProperty,
    SerializableObjectProperty,
    IValidationEvent
} from "./serialization";

export class ValidationResults {
    readonly allIds: Dictionary<number> = {};
    readonly validationEvents: IValidationEvent[] = [];

    addFailure(cardObject: CardObject, event: Enums.ValidationEvent, message: string) {
        this.validationEvents.push({
            phase: Enums.ValidationPhase.Validation,
            source: cardObject,
            event: event,
            message: message
        });
    }
}

export type CardObjectType = { new (): CardObject };

// Base class for every element and action that can appear in a card. This is a
// DOM-free, authoring-only port of the client SDK's `CardObject`: it keeps the
// serializable `type`/`id`/`requires` schema and parent/validation plumbing,
// but drops everything related to HTML rendering and host configuration.
export abstract class CardObject extends SerializableObject {
    //#region Schema

    static readonly typeNameProperty = new StringProperty(
        Versions.v1_0,
        "type",
        undefined,
        undefined,
        undefined,
        (sender: object) => {
            return (<CardObject>sender).getJsonTypeName();
        }
    );
    static readonly idProperty = new StringProperty(Versions.v1_0, "id");
    static readonly requiresProperty = new SerializableObjectProperty(
        Versions.v1_2,
        "requires",
        HostCapabilities,
        false,
        new HostCapabilities()
    );

    protected getSchemaKey(): string {
        return this.getJsonTypeName();
    }

    @property(CardObject.idProperty)
    id?: string;

    @property(CardObject.requiresProperty)
    get requires(): HostCapabilities {
        return this.getValue(CardObject.requiresProperty);
    }

    //#endregion

    protected _parent?: CardObject;

    abstract getJsonTypeName(): string;

    setParent(value: CardObject | undefined) {
        this._parent = value;
    }

    getRootObject(): CardObject {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let currentObject: CardObject = this;

        while (currentObject.parent) {
            currentObject = currentObject.parent;
        }

        return currentObject;
    }

    internalValidateProperties(context: ValidationResults) {
        if (this.id) {
            if (context.allIds.hasOwnProperty(this.id)) {
                if (context.allIds[this.id] === 1) {
                    context.addFailure(
                        this,
                        Enums.ValidationEvent.DuplicateId,
                        Strings.errors.duplicateId(this.id)
                    );
                }

                context.allIds[this.id] += 1;
            } else {
                context.allIds[this.id] = 1;
            }
        }
    }

    validateProperties(): ValidationResults {
        const result = new ValidationResults();

        this.internalValidateProperties(result);

        return result;
    }

    get parent(): CardObject | undefined {
        return this._parent;
    }
}
