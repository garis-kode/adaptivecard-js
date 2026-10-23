// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Minimal subset of the client SDK's localized strings, reduced to the
// messages used by the authoring/serialization layer.
export class Strings {
    static readonly errors = {
        invalidPropertyValue: (value: any, propertyName: string) =>
            `Invalid value "${value}" for property "${propertyName}".`,
        propertyValueNotSupported: (
            value: any,
            propertyName: string,
            propertyTargetVersion: string,
            targetVersion: string
        ) =>
            `Value "${value}" for property "${propertyName}" requires version ${propertyTargetVersion} but target version is ${targetVersion}.`,
        propertyNotSupported: (
            propertyName: string,
            propertyTargetVersion: string,
            targetVersion: string
        ) =>
            `Property "${propertyName}" requires version ${propertyTargetVersion} but target version is ${targetVersion}.`,
        invalidVersionString: (versionString: string) => `Invalid version string "${versionString}".`,
        invalidCardVersion: (fallbackVersion: string) =>
            `Invalid card version. Defaulting to "${fallbackVersion}".`,
        invalidColumnWidth: (invalidWidth: string) => `Invalid column width "${invalidWidth}".`,
        duplicateId: (id: string) => `Duplicate Id "${id}".`,
        propertyMustBeSet: (propertyName: string) => `Property "${propertyName}" must be set.`,
        showCardMustHaveCard: () => "An Action.ShowCard action must have its \"card\" property set.",
        elementTypeNotAllowed: (typeName: string) => `Element type "${typeName}" is not allowed in this context.`,
        actionTypeNotAllowed: (typeName: string) => `Action type "${typeName}" is not allowed in this context.`,
        elementTypeNotStandalone: (typeName: string) =>
            `Element type "${typeName}" cannot be used as a standalone element.`,
        elementAlreadyParented: () => "This element already belongs to another element.",
        elementCannotBeUsedAsInline: () => "This element cannot be used as an inline.",
        inlineAlreadyParented: () => "This inline already belongs to another RichTextBlock.",
        invalidInitialPageIndex: (index: number) => `Invalid initial page index "${index}". Defaulting to 0.`,
        tooLittleTimeDelay: "The specified autoplay delay is too short."
    };
}
