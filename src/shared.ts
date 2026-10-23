// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as Enums from "./enums";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class GlobalSettings {
    // When enabled, unknown/raw JSON properties are preserved through a
    // parse -> toJSON round trip. The authoring-only SDK leaves this off by
    // default (we build JSON rather than round-trip it), but the serialization
    // core honors it exactly like the client SDK.
    static enableFullJsonRoundTrip: boolean = false;
}

export type Dictionary<T> = { [key: string]: T };

export class SizeAndUnit {
    physicalSize: number;
    unit: Enums.SizeUnit;

    static parse(input: string, requireUnitSpecifier: boolean = false): SizeAndUnit {
        const result = new SizeAndUnit(0, Enums.SizeUnit.Weight);

        if (typeof input === "number") {
            result.physicalSize = input;

            return result;
        } else if (typeof input === "string") {
            const regExp = /^([0-9]+)(px|\*)?$/g;
            const matches = regExp.exec(input);
            const expectedMatchCount = requireUnitSpecifier ? 3 : 2;

            if (matches && matches.length >= expectedMatchCount) {
                result.physicalSize = parseInt(matches[1]);

                if (matches.length === 3) {
                    if (matches[2] === "px") {
                        result.unit = Enums.SizeUnit.Pixel;
                    }
                }

                return result;
            }
        }

        throw new Error("Invalid size: " + input);
    }

    constructor(physicalSize: number, unit: Enums.SizeUnit) {
        this.physicalSize = physicalSize;
        this.unit = unit;
    }
}
