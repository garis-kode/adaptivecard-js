// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/*
    These string-valued "enums" are declared as classes with static readonly
    fields to stay compatible with hosts on older TypeScript versions, mirroring
    the pattern used by the client-side `adaptivecards` SDK.
*/
/* eslint-disable @typescript-eslint/no-extraneous-class, @typescript-eslint/naming-convention */
export class ContainerStyle {
    static readonly Default: "default" = "default";
    static readonly Emphasis: "emphasis" = "emphasis";
    static readonly Accent: "accent" = "accent";
    static readonly Good: "good" = "good";
    static readonly Attention: "attention" = "attention";
    static readonly Warning: "warning" = "warning";
}

export class ActionStyle {
    static readonly Default: "default" = "default";
    static readonly Positive: "positive" = "positive";
    static readonly Destructive: "destructive" = "destructive";
}

export class ActionMode {
    static readonly Primary: "primary" = "primary";
    static readonly Secondary: "secondary" = "secondary";
}

export class TargetWidth {
    static readonly VeryNarrow: "VeryNarrow" = "VeryNarrow";
    static readonly Narrow: "Narrow" = "Narrow";
    static readonly Standard: "Standard" = "Standard";
    static readonly Wide: "Wide" = "Wide";
    static readonly AtLeastVeryNarrow: "AtLeast:VeryNarrow" = "AtLeast:VeryNarrow";
    static readonly AtLeastNarrow: "AtLeast:Narrow" = "AtLeast:Narrow";
    static readonly AtLeastStandard: "AtLeast:Standard" = "AtLeast:Standard";
    static readonly AtLeastWide: "AtLeast:Wide" = "AtLeast:Wide";
    static readonly AtMostVeryNarrow: "AtMost:VeryNarrow" = "AtMost:VeryNarrow";
    static readonly AtMostNarrow: "AtMost:Narrow" = "AtMost:Narrow";
    static readonly AtMostStandard: "AtMost:Standard" = "AtMost:Standard";
    static readonly AtMostWide: "AtMost:Wide" = "AtMost:Wide";
}
/* eslint-enable @typescript-eslint/no-extraneous-class, @typescript-eslint/naming-convention */

export enum Size {
    Auto,
    Stretch,
    Small,
    Medium,
    Large
}

export enum ImageSize {
    Small,
    Medium,
    Large
}

export enum IconSize {
    xxSmall,
    xSmall,
    Small,
    Standard,
    Medium,
    Large,
    xLarge,
    xxLarge
}

export enum IconStyle {
    Regular,
    Filled
}

export enum ImageSetPresentationStyle {
    Default,
    Stacked,
    Grid
}

export enum SizeUnit {
    Weight,
    Pixel
}

export enum TextSize {
    Small,
    Default,
    Medium,
    Large,
    ExtraLarge
}

export enum InputStyle {
    RevealOnHover,
    Default
}

export enum TextWeight {
    Lighter,
    Default,
    Bolder
}

export enum FontType {
    Default,
    Monospace
}

export enum Spacing {
    None,
    Small,
    Default,
    Medium,
    Large,
    ExtraLarge,
    Padding
}

export enum TextColor {
    Default,
    Dark,
    Light,
    Accent,
    Good,
    Warning,
    Attention
}

export enum HorizontalAlignment {
    Left,
    Center,
    Right
}

export enum VerticalAlignment {
    Top,
    Center,
    Bottom
}

export enum ActionAlignment {
    Left,
    Center,
    Right,
    Stretch
}

export enum ImageStyle {
    Default,
    Person,
    RoundedCorners
}

export enum ShowCardActionMode {
    Inline,
    Popup
}

export enum Orientation {
    Horizontal,
    Vertical
}

export enum FillMode {
    Cover,
    RepeatHorizontally,
    RepeatVertically,
    Repeat
}

export enum ActionIconPlacement {
    LeftOfTitle,
    AboveTitle
}

export enum InputTextStyle {
    Text,
    Tel,
    Url,
    Email,
    Password
}

export enum InputLabelPosition {
    Inline,
    Above
}

export enum ValidationPhase {
    Parse,
    ToJSON,
    Validation
}

export enum ValidationEvent {
    Hint,
    ActionTypeNotAllowed,
    CollectionCantBeEmpty,
    Deprecated,
    ElementTypeNotAllowed,
    InteractivityNotAllowed,
    InvalidPropertyValue,
    MissingCardType,
    PropertyCantBeNull,
    TooManyActions,
    UnknownActionType,
    UnknownElementType,
    UnsupportedCardVersion,
    DuplicateId,
    UnsupportedProperty,
    RequiredInputsShouldHaveLabel,
    RequiredInputsShouldHaveErrorMessage,
    Other
}

export enum ContainerFitStatus {
    FullyInContainer,
    Overflowing,
    FullyOutOfContainer
}

export enum TypeErrorType {
    UnknownType,
    ForbiddenType
}

export enum RefreshMode {
    Disabled,
    Manual,
    Automatic
}

export enum LogLevel {
    Info,
    Warning,
    Error
}

export enum CarouselInteractionEvent {
    NavigationNext,
    NavigationPrevious,
    Pagination,
    Autoplay
}

export enum ActionRole {
    Button,
    Link,
    Tab,
    Menu,
    MenuItem
}
