// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as Enums from "./enums";
import { SizeAndUnit } from "./shared";
import { Strings } from "./strings";
import { CardObject } from "./card-object";
import { Action, ActionProperty } from "./actions";
import {
    BaseSerializationContext,
    BoolProperty,
    CustomProperty,
    EnumProperty,
    NumProperty,
    PixelSizeProperty,
    property,
    PropertyBag,
    PropertyDefinition,
    SerializableObject,
    SerializableObjectCollectionProperty,
    SerializableObjectProperty,
    SerializableObjectSchema,
    StringArrayProperty,
    StringProperty,
    ValueSetProperty,
    Version,
    Versions
} from "./serialization";

// Serialization context. Kept as a distinct type (mirroring the client SDK) so
// that element/action registries can be attached when parse support is added.
export class SerializationContext extends BaseSerializationContext { }

const containerStyleValues = [
    { value: Enums.ContainerStyle.Default },
    { value: Enums.ContainerStyle.Emphasis },
    { value: Enums.ContainerStyle.Accent },
    { value: Enums.ContainerStyle.Good },
    { value: Enums.ContainerStyle.Attention },
    { value: Enums.ContainerStyle.Warning }
];

export class ContainerStyleProperty extends ValueSetProperty {
    constructor(readonly targetVersion: Version, readonly name: string) {
        super(targetVersion, name, containerStyleValues.slice());
    }
}

const targetWidthValues = [
    { value: Enums.TargetWidth.VeryNarrow },
    { value: Enums.TargetWidth.Narrow },
    { value: Enums.TargetWidth.Standard },
    { value: Enums.TargetWidth.Wide },
    { value: Enums.TargetWidth.AtLeastVeryNarrow },
    { value: Enums.TargetWidth.AtLeastNarrow },
    { value: Enums.TargetWidth.AtLeastStandard },
    { value: Enums.TargetWidth.AtLeastWide },
    { value: Enums.TargetWidth.AtMostVeryNarrow },
    { value: Enums.TargetWidth.AtMostNarrow },
    { value: Enums.TargetWidth.AtMostStandard },
    { value: Enums.TargetWidth.AtMostWide }
];

export type CardElementHeight = "auto" | "stretch";

export abstract class CardElement extends CardObject {
    //#region Schema

    static readonly langProperty = new StringProperty(
        Versions.v1_1,
        "lang",
        true,
        /^[a-z]{2,3}$/gi
    );
    static readonly isVisibleProperty = new BoolProperty(Versions.v1_2, "isVisible", true);
    static readonly separatorProperty = new BoolProperty(Versions.v1_0, "separator", false);
    static readonly heightProperty = new ValueSetProperty(
        Versions.v1_1,
        "height",
        [{ value: "auto" }, { value: "stretch" }],
        "auto"
    );
    static readonly horizontalAlignmentProperty = new EnumProperty(
        Versions.v1_0,
        "horizontalAlignment",
        Enums.HorizontalAlignment
    );
    static readonly spacingProperty = new EnumProperty(
        Versions.v1_0,
        "spacing",
        Enums.Spacing,
        Enums.Spacing.Default
    );
    static readonly targetWidthProperty = new ValueSetProperty(
        Versions.v1_6,
        "targetWidth",
        targetWidthValues.slice()
    );

    @property(CardElement.horizontalAlignmentProperty)
    horizontalAlignment?: Enums.HorizontalAlignment;

    @property(CardElement.targetWidthProperty)
    targetWidth?: string;

    @property(CardElement.spacingProperty)
    spacing: Enums.Spacing = Enums.Spacing.Default;

    @property(CardElement.separatorProperty)
    separator: boolean = false;

    @property(CardElement.heightProperty)
    height: CardElementHeight = "auto";

    @property(CardElement.isVisibleProperty)
    isVisible: boolean = true;

    @property(CardElement.langProperty)
    lang?: string;

    //#endregion

    get isStandalone(): boolean {
        return true;
    }

    get isInline(): boolean {
        return false;
    }
}

export abstract class BaseTextBlock extends CardElement {
    //#region Schema

    static readonly textProperty = new StringProperty(Versions.v1_0, "text", true);
    static readonly sizeProperty = new EnumProperty(Versions.v1_0, "size", Enums.TextSize);
    static readonly weightProperty = new EnumProperty(Versions.v1_0, "weight", Enums.TextWeight);
    static readonly colorProperty = new EnumProperty(Versions.v1_0, "color", Enums.TextColor);
    static readonly isSubtleProperty = new BoolProperty(Versions.v1_0, "isSubtle");
    static readonly fontTypeProperty = new EnumProperty(Versions.v1_2, "fontType", Enums.FontType);
    static readonly selectActionProperty = new ActionProperty(Versions.v1_1, "selectAction", [
        "Action.ShowCard"
    ]);

    @property(BaseTextBlock.textProperty)
    text?: string;

    @property(BaseTextBlock.sizeProperty)
    size?: Enums.TextSize;

    @property(BaseTextBlock.weightProperty)
    weight?: Enums.TextWeight;

    @property(BaseTextBlock.colorProperty)
    color?: Enums.TextColor;

    @property(BaseTextBlock.isSubtleProperty)
    isSubtle?: boolean;

    @property(BaseTextBlock.fontTypeProperty)
    fontType?: Enums.FontType;

    @property(BaseTextBlock.selectActionProperty)
    selectAction?: Action;

    //#endregion

    constructor(text?: string) {
        super();

        if (text !== undefined) {
            this.text = text;
        }
    }
}

export class TextBlock extends BaseTextBlock {
    //#region Schema

    static readonly wrapProperty = new BoolProperty(Versions.v1_0, "wrap", false);
    static readonly maxLinesProperty = new NumProperty(Versions.v1_0, "maxLines");
    static readonly styleProperty = new ValueSetProperty(Versions.v1_5, "style", [
        { value: "default" },
        { value: "columnHeader" },
        { value: "heading" }
    ]);

    @property(TextBlock.wrapProperty)
    wrap: boolean = false;

    @property(TextBlock.maxLinesProperty)
    maxLines?: number;

    @property(TextBlock.styleProperty)
    style?: string;

    //#endregion

    getJsonTypeName(): string {
        return "TextBlock";
    }
}

export class TextRun extends BaseTextBlock {
    //#region Schema

    static readonly italicProperty = new BoolProperty(Versions.v1_2, "italic", false);
    static readonly strikethroughProperty = new BoolProperty(Versions.v1_2, "strikethrough", false);
    static readonly highlightProperty = new BoolProperty(Versions.v1_2, "highlight", false);
    static readonly underlineProperty = new BoolProperty(Versions.v1_3, "underline", false);

    @property(TextRun.italicProperty)
    italic: boolean = false;

    @property(TextRun.strikethroughProperty)
    strikethrough: boolean = false;

    @property(TextRun.highlightProperty)
    highlight: boolean = false;

    @property(TextRun.underlineProperty)
    underline: boolean = false;

    //#endregion

    getJsonTypeName(): string {
        return "TextRun";
    }

    get isInline(): boolean {
        return true;
    }
}

export class RichTextBlock extends CardElement {
    private _inlines: CardElement[] = [];

    protected internalToJSON(target: PropertyBag, context: SerializationContext) {
        super.internalToJSON(target, context);

        if (this._inlines.length > 0) {
            const jsonInlines: any[] = [];

            for (const inline of this._inlines) {
                jsonInlines.push(inline.toJSON(context));
            }

            context.serializeValue(target, "inlines", jsonInlines);
        }
    }

    getJsonTypeName(): string {
        return "RichTextBlock";
    }

    addInline(inline: CardElement | string) {
        if (typeof inline === "string") {
            const textRun = new TextRun();
            textRun.text = inline;
            inline = textRun;
        }

        if (!inline.isInline) {
            throw new Error(Strings.errors.elementCannotBeUsedAsInline());
        }

        if (inline.parent && inline.parent !== this) {
            throw new Error(Strings.errors.inlineAlreadyParented());
        }

        inline.setParent(this);
        this._inlines.push(inline);
    }

    getInlineCount(): number {
        return this._inlines.length;
    }

    getInlineAt(index: number): CardElement {
        return this._inlines[index];
    }
}

export class Fact extends SerializableObject {
    //#region Schema

    static readonly titleProperty = new StringProperty(Versions.v1_0, "title");
    static readonly valueProperty = new StringProperty(Versions.v1_0, "value");

    @property(Fact.titleProperty)
    title?: string;

    @property(Fact.valueProperty)
    value?: string;

    //#endregion

    protected getSchemaKey(): string {
        return "Fact";
    }

    constructor(title?: string, value?: string) {
        super();

        this.title = title;
        this.value = value;
    }
}

export class FactSet extends CardElement {
    //#region Schema

    static readonly factsProperty = new SerializableObjectCollectionProperty(
        Versions.v1_0,
        "facts",
        Fact
    );

    @property(FactSet.factsProperty)
    facts: Fact[] = [];

    //#endregion

    getJsonTypeName(): string {
        return "FactSet";
    }

    addFact(fact: Fact) {
        this.facts.push(fact);
    }
}

export class Image extends CardElement {
    //#region Schema

    static readonly urlProperty = new StringProperty(Versions.v1_0, "url");
    static readonly altTextProperty = new StringProperty(Versions.v1_0, "altText");
    static readonly backgroundColorProperty = new StringProperty(Versions.v1_1, "backgroundColor");
    static readonly styleProperty = new EnumProperty(Versions.v1_0, "style", Enums.ImageStyle);
    static readonly sizeProperty = new EnumProperty(Versions.v1_0, "size", Enums.Size);
    static readonly pixelWidthProperty = new PixelSizeProperty(Versions.v1_1, "width");
    static readonly pixelHeightProperty = new PixelSizeProperty(Versions.v1_1, "height");
    static readonly selectActionProperty = new ActionProperty(Versions.v1_1, "selectAction", [
        "Action.ShowCard"
    ]);
    static readonly forceLoadProperty = new BoolProperty(Versions.v1_6, "forceLoad", false);

    @property(Image.urlProperty)
    url?: string;

    @property(Image.altTextProperty)
    altText?: string;

    @property(Image.backgroundColorProperty)
    backgroundColor?: string;

    @property(Image.styleProperty)
    style?: Enums.ImageStyle;

    @property(Image.sizeProperty)
    size?: Enums.Size;

    @property(Image.pixelWidthProperty)
    pixelWidth?: number;

    @property(Image.pixelHeightProperty)
    pixelHeight?: number;

    @property(Image.selectActionProperty)
    selectAction?: Action;

    @property(Image.forceLoadProperty)
    forceLoad: boolean = false;

    //#endregion

    protected populateSchema(schema: SerializableObjectSchema) {
        super.populateSchema(schema);

        schema.remove(CardElement.heightProperty);
    }

    getJsonTypeName(): string {
        return "Image";
    }

    constructor(url?: string) {
        super();

        if (url !== undefined) {
            this.url = url;
        }
    }
}

export abstract class CardElementContainer extends CardElement {
    //#region Schema

    static readonly selectActionProperty = new ActionProperty(Versions.v1_1, "selectAction", [
        "Action.ShowCard"
    ]);

    @property(CardElementContainer.selectActionProperty)
    get selectAction(): Action | undefined {
        return this.getValue(CardElementContainer.selectActionProperty);
    }

    set selectAction(value: Action | undefined) {
        this.setValue(CardElementContainer.selectActionProperty, value);
    }

    //#endregion
}

export class ImageSet extends CardElementContainer {
    //#region Schema

    static readonly imagesProperty = new SerializableObjectCollectionProperty(
        Versions.v1_0,
        "images",
        Image,
        (sender: SerializableObject, item: SerializableObject) => {
            (item as Image).setParent(sender as CardElement);
        }
    );
    static readonly imageSizeProperty = new EnumProperty(
        Versions.v1_0,
        "imageSize",
        Enums.ImageSize,
        Enums.ImageSize.Medium
    );
    static readonly styleProperty = new EnumProperty(
        Versions.v1_6,
        "style",
        Enums.ImageSetPresentationStyle,
        Enums.ImageSetPresentationStyle.Default
    );
    static readonly offsetProperty = new NumProperty(Versions.v1_6, "offset", 0);

    @property(ImageSet.imagesProperty)
    images: Image[] = [];

    @property(ImageSet.imageSizeProperty)
    imageSize: Enums.ImageSize = Enums.ImageSize.Medium;

    @property(ImageSet.styleProperty)
    style: Enums.ImageSetPresentationStyle = Enums.ImageSetPresentationStyle.Default;

    @property(ImageSet.offsetProperty)
    offset: number = 0;

    //#endregion

    getJsonTypeName(): string {
        return "ImageSet";
    }

    addImage(image: Image) {
        image.setParent(this);
        this.images.push(image);
    }
}

export class MediaSource extends SerializableObject {
    //#region Schema

    static readonly mimeTypeProperty = new StringProperty(Versions.v1_1, "mimeType");
    static readonly urlProperty = new StringProperty(Versions.v1_1, "url");

    @property(MediaSource.mimeTypeProperty)
    mimeType?: string;

    @property(MediaSource.urlProperty)
    url?: string;

    //#endregion

    protected getSchemaKey(): string {
        return "MediaSource";
    }

    constructor(url?: string, mimeType?: string) {
        super();

        this.url = url;
        this.mimeType = mimeType;
    }
}

export class CaptionSource extends SerializableObject {
    //#region Schema

    static readonly mimeTypeProperty = new StringProperty(Versions.v1_6, "mimeType");
    static readonly urlProperty = new StringProperty(Versions.v1_6, "url");
    static readonly labelProperty = new StringProperty(Versions.v1_6, "label");

    @property(CaptionSource.mimeTypeProperty)
    mimeType?: string;

    @property(CaptionSource.urlProperty)
    url?: string;

    @property(CaptionSource.labelProperty)
    label?: string;

    //#endregion

    protected getSchemaKey(): string {
        return "CaptionSource";
    }
}

export class Media extends CardElement {
    //#region Schema

    static readonly sourcesProperty = new SerializableObjectCollectionProperty(
        Versions.v1_1,
        "sources",
        MediaSource
    );
    static readonly captionSourcesProperty = new SerializableObjectCollectionProperty(
        Versions.v1_6,
        "captionSources",
        CaptionSource
    );
    static readonly posterProperty = new StringProperty(Versions.v1_1, "poster");
    static readonly altTextProperty = new StringProperty(Versions.v1_1, "altText");

    @property(Media.sourcesProperty)
    sources: MediaSource[] = [];

    @property(Media.captionSourcesProperty)
    captionSources: CaptionSource[] = [];

    @property(Media.posterProperty)
    poster?: string;

    @property(Media.altTextProperty)
    altText?: string;

    //#endregion

    getJsonTypeName(): string {
        return "Media";
    }

    addSource(source: MediaSource) {
        this.sources.push(source);
    }
}

//#region Inputs

export abstract class Input extends CardElement {
    //#region Schema

    static readonly labelProperty = new StringProperty(Versions.v1_3, "label", true);
    static readonly isRequiredProperty = new BoolProperty(Versions.v1_3, "isRequired", false);
    static readonly errorMessageProperty = new StringProperty(Versions.v1_3, "errorMessage", true);

    @property(Input.labelProperty)
    label?: string;

    @property(Input.isRequiredProperty)
    isRequired: boolean = false;

    @property(Input.errorMessageProperty)
    errorMessage?: string;

    //#endregion
}

export class TextInput extends Input {
    //#region Schema

    static readonly valueProperty = new StringProperty(Versions.v1_0, "value");
    static readonly maxLengthProperty = new NumProperty(Versions.v1_0, "maxLength");
    static readonly isMultilineProperty = new BoolProperty(Versions.v1_0, "isMultiline", false);
    static readonly placeholderProperty = new StringProperty(Versions.v1_0, "placeholder");
    static readonly styleProperty = new EnumProperty(Versions.v1_0, "style", Enums.InputTextStyle);
    static readonly inlineActionProperty = new ActionProperty(Versions.v1_0, "inlineAction", [
        "Action.ShowCard"
    ]);
    static readonly regexProperty = new StringProperty(Versions.v1_3, "regex", true);

    @property(TextInput.valueProperty)
    defaultValue?: string;

    @property(TextInput.maxLengthProperty)
    maxLength?: number;

    @property(TextInput.isMultilineProperty)
    isMultiline: boolean = false;

    @property(TextInput.placeholderProperty)
    placeholder?: string;

    @property(TextInput.styleProperty)
    style?: Enums.InputTextStyle;

    @property(TextInput.inlineActionProperty)
    inlineAction?: Action;

    @property(TextInput.regexProperty)
    regex?: string;

    //#endregion

    getJsonTypeName(): string {
        return "Input.Text";
    }
}

export class NumberInput extends Input {
    //#region Schema

    static readonly valueProperty = new NumProperty(Versions.v1_0, "value");
    static readonly placeholderProperty = new StringProperty(Versions.v1_0, "placeholder");
    static readonly minProperty = new NumProperty(Versions.v1_0, "min");
    static readonly maxProperty = new NumProperty(Versions.v1_0, "max");

    @property(NumberInput.valueProperty)
    defaultValue?: number;

    @property(NumberInput.placeholderProperty)
    placeholder?: string;

    @property(NumberInput.minProperty)
    min?: number;

    @property(NumberInput.maxProperty)
    max?: number;

    //#endregion

    getJsonTypeName(): string {
        return "Input.Number";
    }
}

export class DateInput extends Input {
    //#region Schema

    static readonly valueProperty = new StringProperty(Versions.v1_0, "value");
    static readonly placeholderProperty = new StringProperty(Versions.v1_0, "placeholder");
    static readonly minProperty = new StringProperty(Versions.v1_0, "min");
    static readonly maxProperty = new StringProperty(Versions.v1_0, "max");

    @property(DateInput.valueProperty)
    defaultValue?: string;

    @property(DateInput.placeholderProperty)
    placeholder?: string;

    @property(DateInput.minProperty)
    min?: string;

    @property(DateInput.maxProperty)
    max?: string;

    //#endregion

    getJsonTypeName(): string {
        return "Input.Date";
    }
}

export class TimeInput extends Input {
    //#region Schema

    static readonly valueProperty = new StringProperty(Versions.v1_0, "value");
    static readonly placeholderProperty = new StringProperty(Versions.v1_0, "placeholder");
    static readonly minProperty = new StringProperty(Versions.v1_0, "min");
    static readonly maxProperty = new StringProperty(Versions.v1_0, "max");

    @property(TimeInput.valueProperty)
    defaultValue?: string;

    @property(TimeInput.placeholderProperty)
    placeholder?: string;

    @property(TimeInput.minProperty)
    min?: string;

    @property(TimeInput.maxProperty)
    max?: string;

    //#endregion

    getJsonTypeName(): string {
        return "Input.Time";
    }
}

export class ToggleInput extends Input {
    //#region Schema

    static readonly valueProperty = new StringProperty(Versions.v1_0, "value");
    static readonly titleProperty = new StringProperty(Versions.v1_0, "title");
    static readonly valueOnProperty = new StringProperty(Versions.v1_0, "valueOn", true, undefined, "true");
    static readonly valueOffProperty = new StringProperty(Versions.v1_0, "valueOff", true, undefined, "false");
    static readonly wrapProperty = new BoolProperty(Versions.v1_2, "wrap", false);

    @property(ToggleInput.valueProperty)
    defaultValue?: string;

    @property(ToggleInput.titleProperty)
    title?: string;

    @property(ToggleInput.valueOnProperty)
    valueOn: string = "true";

    @property(ToggleInput.valueOffProperty)
    valueOff: string = "false";

    @property(ToggleInput.wrapProperty)
    wrap: boolean = false;

    //#endregion

    getJsonTypeName(): string {
        return "Input.Toggle";
    }
}

export class Choice extends SerializableObject {
    //#region Schema

    static readonly titleProperty = new StringProperty(Versions.v1_0, "title");
    static readonly valueProperty = new StringProperty(Versions.v1_0, "value");

    @property(Choice.titleProperty)
    title?: string;

    @property(Choice.valueProperty)
    value?: string;

    //#endregion

    protected getSchemaKey(): string {
        return "Choice";
    }

    constructor(title?: string, value?: string) {
        super();

        this.title = title;
        this.value = value;
    }
}

export class ChoiceSetInput extends Input {
    //#region Schema

    static readonly valueProperty = new StringProperty(Versions.v1_0, "value");
    static readonly choicesProperty = new SerializableObjectCollectionProperty(
        Versions.v1_0,
        "choices",
        Choice
    );
    static readonly styleProperty = new ValueSetProperty(
        Versions.v1_0,
        "style",
        [
            { value: "compact" },
            { value: "expanded" },
            { value: "filtered", targetVersion: Versions.v1_5 }
        ],
        "compact"
    );
    static readonly isMultiSelectProperty = new BoolProperty(Versions.v1_0, "isMultiSelect", false);
    static readonly placeholderProperty = new StringProperty(Versions.v1_0, "placeholder");
    static readonly wrapProperty = new BoolProperty(Versions.v1_2, "wrap", false);

    @property(ChoiceSetInput.valueProperty)
    defaultValue?: string;

    @property(ChoiceSetInput.choicesProperty)
    choices: Choice[] = [];

    @property(ChoiceSetInput.styleProperty)
    style?: string;

    @property(ChoiceSetInput.isMultiSelectProperty)
    isMultiSelect: boolean = false;

    @property(ChoiceSetInput.placeholderProperty)
    placeholder?: string;

    @property(ChoiceSetInput.wrapProperty)
    wrap: boolean = false;

    //#endregion

    getJsonTypeName(): string {
        return "Input.ChoiceSet";
    }

    addChoice(choice: Choice) {
        this.choices.push(choice);
    }
}

//#endregion

export class BackgroundImage extends SerializableObject {
    //#region Schema

    static readonly urlProperty = new StringProperty(Versions.v1_0, "url");
    static readonly fillModeProperty = new EnumProperty(Versions.v1_2, "fillMode", Enums.FillMode);
    static readonly horizontalAlignmentProperty = new EnumProperty(
        Versions.v1_2,
        "horizontalAlignment",
        Enums.HorizontalAlignment
    );
    static readonly verticalAlignmentProperty = new EnumProperty(
        Versions.v1_2,
        "verticalAlignment",
        Enums.VerticalAlignment
    );

    @property(BackgroundImage.urlProperty)
    url?: string;

    @property(BackgroundImage.fillModeProperty)
    fillMode?: Enums.FillMode;

    @property(BackgroundImage.horizontalAlignmentProperty)
    horizontalAlignment?: Enums.HorizontalAlignment;

    @property(BackgroundImage.verticalAlignmentProperty)
    verticalAlignment?: Enums.VerticalAlignment;

    //#endregion

    protected getSchemaKey(): string {
        return "BackgroundImage";
    }
}

export abstract class StylableCardElementContainer extends CardElementContainer {
    //#region Schema

    static readonly styleProperty = new ContainerStyleProperty(Versions.v1_0, "style");

    @property(StylableCardElementContainer.styleProperty)
    get style(): string | undefined {
        return this.getValue(StylableCardElementContainer.styleProperty);
    }

    set style(value: string | undefined) {
        this.setValue(StylableCardElementContainer.styleProperty, value);
    }

    //#endregion
}

export abstract class ContainerBase extends StylableCardElementContainer {
    //#region Schema

    static readonly bleedProperty = new BoolProperty(Versions.v1_2, "bleed", false);
    static readonly minHeightProperty = new PixelSizeProperty(Versions.v1_2, "minHeight");

    @property(ContainerBase.bleedProperty)
    bleed: boolean = false;

    @property(ContainerBase.minHeightProperty)
    minPixelHeight?: number;

    //#endregion
}

export class Container extends ContainerBase {
    //#region Schema

    static readonly backgroundImageProperty = new SerializableObjectProperty(
        Versions.v1_0,
        "backgroundImage",
        BackgroundImage
    );
    static readonly verticalContentAlignmentProperty = new EnumProperty(
        Versions.v1_1,
        "verticalContentAlignment",
        Enums.VerticalAlignment
    );
    static readonly rtlProperty = new BoolProperty(Versions.v1_0, "rtl");

    @property(Container.backgroundImageProperty)
    get backgroundImage(): BackgroundImage {
        return this.getValue(Container.backgroundImageProperty);
    }

    @property(Container.verticalContentAlignmentProperty)
    verticalContentAlignment?: Enums.VerticalAlignment;

    @property(Container.rtlProperty)
    rtl?: boolean;

    //#endregion

    protected _items: CardElement[] = [];

    protected getItemsCollectionPropertyName(): string {
        return "items";
    }

    protected internalToJSON(target: PropertyBag, context: SerializationContext) {
        super.internalToJSON(target, context);

        context.serializeArray(target, this.getItemsCollectionPropertyName(), this._items);
    }

    addItem(item: CardElement) {
        if (item.parent) {
            throw new Error(Strings.errors.elementAlreadyParented());
        }

        if (!item.isStandalone) {
            throw new Error(Strings.errors.elementTypeNotStandalone(item.getJsonTypeName()));
        }

        item.setParent(this);
        this._items.push(item);
    }

    getItemCount(): number {
        return this._items.length;
    }

    getItemAt(index: number): CardElement {
        return this._items[index];
    }

    getJsonTypeName(): string {
        return "Container";
    }
}

export type ColumnWidth = SizeAndUnit | "auto" | "stretch" | number;

export class Column extends Container {
    //#region Schema

    static readonly widthProperty = new CustomProperty<ColumnWidth>(
        Versions.v1_0,
        "width",
        (
            sender: SerializableObject,
            prop: PropertyDefinition,
            source: PropertyBag,
            context: BaseSerializationContext
        ) => {
            let result: ColumnWidth = prop.defaultValue;
            const value = source[prop.name];
            let invalidWidth = false;

            if (typeof value === "number" && !isNaN(value)) {
                result = new SizeAndUnit(value, Enums.SizeUnit.Weight);
            } else if (value === "auto" || value === "stretch") {
                result = value;
            } else if (typeof value === "string") {
                try {
                    result = SizeAndUnit.parse(value);
                } catch {
                    invalidWidth = true;
                }
            } else {
                invalidWidth = true;
            }

            if (invalidWidth) {
                context.logParseEvent(
                    sender,
                    Enums.ValidationEvent.InvalidPropertyValue,
                    Strings.errors.invalidColumnWidth(value)
                );

                result = "auto";
            }

            return result;
        },
        (
            _sender: SerializableObject,
            _property: PropertyDefinition,
            target: PropertyBag,
            value: ColumnWidth,
            context: BaseSerializationContext
        ) => {
            if (value instanceof SizeAndUnit) {
                if (value.unit === Enums.SizeUnit.Pixel) {
                    context.serializeValue(target, "width", value.physicalSize + "px");
                } else {
                    context.serializeNumber(target, "width", value.physicalSize);
                }
            } else {
                context.serializeValue(target, "width", value);
            }
        },
        "stretch"
    );

    @property(Column.widthProperty)
    width: ColumnWidth = "stretch";

    //#endregion

    constructor(width: ColumnWidth = "stretch") {
        super();

        this.width = width;
    }

    getJsonTypeName(): string {
        return "Column";
    }

    get isStandalone(): boolean {
        return false;
    }
}

export class ColumnSet extends ContainerBase {
    private _columns: Column[] = [];

    protected internalToJSON(target: PropertyBag, context: SerializationContext) {
        super.internalToJSON(target, context);

        context.serializeArray(target, "columns", this._columns);
    }

    getJsonTypeName(): string {
        return "ColumnSet";
    }

    addColumn(column: Column) {
        if (column.parent) {
            throw new Error(Strings.errors.elementAlreadyParented());
        }

        column.setParent(this);
        this._columns.push(column);
    }

    getColumnCount(): number {
        return this._columns.length;
    }

    getColumnAt(index: number): Column {
        return this._columns[index];
    }
}

export class ActionSet extends CardElement {
    //#region Schema

    static readonly orientationProperty = new EnumProperty(
        Versions.v1_1,
        "orientation",
        Enums.Orientation
    );

    @property(ActionSet.orientationProperty)
    orientation?: Enums.Orientation;

    //#endregion

    private _actions: Action[] = [];

    protected internalToJSON(target: PropertyBag, context: SerializationContext) {
        super.internalToJSON(target, context);

        context.serializeArray(target, "actions", this._actions);
    }

    getJsonTypeName(): string {
        return "ActionSet";
    }

    addAction(action: Action) {
        action.setParent(this);
        this._actions.push(action);
    }

    getActionCount(): number {
        return this._actions.length;
    }

    getActionAt(index: number): Action {
        return this._actions[index];
    }
}

export abstract class ContainerWithActions extends Container {
    private _actions: Action[] = [];

    protected internalToJSON(target: PropertyBag, context: SerializationContext) {
        super.internalToJSON(target, context);

        context.serializeArray(target, "actions", this._actions);
    }

    addAction(action: Action) {
        action.setParent(this);
        this._actions.push(action);
    }

    getActionCount(): number {
        return this._actions.length;
    }

    getActionAt(index: number): Action {
        return this._actions[index];
    }
}

//#region Actions that depend on card elements

export class ShowCardAction extends Action {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    static readonly JsonTypeName: "Action.ShowCard" = "Action.ShowCard";

    readonly card: AdaptiveCard = new AdaptiveCard();

    protected internalToJSON(target: PropertyBag, context: SerializationContext) {
        super.internalToJSON(target, context);

        if (this.card) {
            const serializedCard = this.card.toJSON(context);

            if (serializedCard) {
                // Inline (show) cards don't carry a $schema reference.
                delete serializedCard["$schema"];
            }

            context.serializeValue(target, "card", serializedCard);
        }
    }

    getJsonTypeName(): string {
        return ShowCardAction.JsonTypeName;
    }

    setParent(value: CardObject | undefined) {
        super.setParent(value);

        this.card.setParent(value);
    }
}

//#endregion

export class RefreshDefinition extends SerializableObject {
    //#region Schema

    static readonly actionProperty = new ActionProperty(Versions.v1_4, "action");
    static readonly userIdsProperty = new StringArrayProperty(Versions.v1_4, "userIds");

    @property(RefreshDefinition.actionProperty)
    get action(): Action | undefined {
        return this.getValue(RefreshDefinition.actionProperty);
    }

    set action(value: Action | undefined) {
        this.setValue(RefreshDefinition.actionProperty, value);
    }

    @property(RefreshDefinition.userIdsProperty)
    userIds?: string[];

    //#endregion

    protected getSchemaKey(): string {
        return "RefreshDefinition";
    }
}

export class TokenExchangeResource extends SerializableObject {
    //#region Schema

    static readonly idProperty = new StringProperty(Versions.v1_4, "id");
    static readonly uriProperty = new StringProperty(Versions.v1_4, "uri");
    static readonly providerIdProperty = new StringProperty(Versions.v1_4, "providerId");

    @property(TokenExchangeResource.idProperty)
    id?: string;

    @property(TokenExchangeResource.uriProperty)
    uri?: string;

    @property(TokenExchangeResource.providerIdProperty)
    providerId?: string;

    //#endregion

    protected getSchemaKey(): string {
        return "TokenExchangeResource";
    }
}

export class AuthCardButton extends SerializableObject {
    //#region Schema

    static readonly typeProperty = new StringProperty(Versions.v1_4, "type");
    static readonly titleProperty = new StringProperty(Versions.v1_4, "title");
    static readonly imageProperty = new StringProperty(Versions.v1_4, "image");
    static readonly valueProperty = new StringProperty(Versions.v1_4, "value");

    @property(AuthCardButton.typeProperty)
    type?: string;

    @property(AuthCardButton.titleProperty)
    title?: string;

    @property(AuthCardButton.imageProperty)
    image?: string;

    @property(AuthCardButton.valueProperty)
    value?: string;

    //#endregion

    protected getSchemaKey(): string {
        return "AuthCardButton";
    }
}

export class Authentication extends SerializableObject {
    //#region Schema

    static readonly textProperty = new StringProperty(Versions.v1_4, "text");
    static readonly connectionNameProperty = new StringProperty(Versions.v1_4, "connectionName");
    static readonly buttonsProperty = new SerializableObjectCollectionProperty(
        Versions.v1_4,
        "buttons",
        AuthCardButton
    );
    static readonly tokenExchangeResourceProperty = new SerializableObjectProperty(
        Versions.v1_4,
        "tokenExchangeResource",
        TokenExchangeResource,
        true
    );

    @property(Authentication.textProperty)
    text?: string;

    @property(Authentication.connectionNameProperty)
    connectionName?: string;

    @property(Authentication.buttonsProperty)
    buttons: AuthCardButton[] = [];

    @property(Authentication.tokenExchangeResourceProperty)
    tokenExchangeResource?: TokenExchangeResource;

    //#endregion

    protected getSchemaKey(): string {
        return "Authentication";
    }
}

export class AdaptiveCard extends ContainerWithActions {
    static readonly schemaUrl = "https://adaptivecards.io/schemas/adaptive-card.json";

    //#region Schema

    // eslint-disable-next-line @typescript-eslint/naming-convention
    protected static readonly $schemaProperty = new CustomProperty<string>(
        Versions.v1_0,
        "$schema",
        () => {
            return AdaptiveCard.schemaUrl;
        },
        (
            _sender: SerializableObject,
            prop: PropertyDefinition,
            target: PropertyBag,
            _value: string,
            context: BaseSerializationContext
        ) => {
            context.serializeValue(target, prop.name, AdaptiveCard.schemaUrl);
        }
    );

    static readonly versionProperty = new CustomProperty<Version | undefined>(
        Versions.v1_0,
        "version",
        (
            sender: SerializableObject,
            prop: PropertyDefinition,
            source: PropertyBag,
            context: BaseSerializationContext
        ) => {
            let version = Version.parse(source[prop.name], context);

            if (version === undefined) {
                version = Versions.latest;
            }

            return version;
        },
        (
            _sender: SerializableObject,
            prop: PropertyDefinition,
            target: PropertyBag,
            value: Version | undefined,
            context: BaseSerializationContext
        ) => {
            if (value !== undefined) {
                context.serializeValue(target, prop.name, value.toString());
            }
        },
        Versions.latest
    );

    static readonly fallbackTextProperty = new StringProperty(Versions.v1_0, "fallbackText");
    static readonly speakProperty = new StringProperty(Versions.v1_0, "speak");
    static readonly refreshProperty = new SerializableObjectProperty(
        Versions.v1_4,
        "refresh",
        RefreshDefinition,
        true
    );
    static readonly authenticationProperty = new SerializableObjectProperty(
        Versions.v1_4,
        "authentication",
        Authentication,
        true
    );

    @property(AdaptiveCard.versionProperty)
    version: Version = Versions.latest;

    @property(AdaptiveCard.fallbackTextProperty)
    fallbackText?: string;

    @property(AdaptiveCard.speakProperty)
    speak?: string;

    @property(AdaptiveCard.refreshProperty)
    get refresh(): RefreshDefinition | undefined {
        return this.getValue(AdaptiveCard.refreshProperty);
    }

    set refresh(value: RefreshDefinition | undefined) {
        this.setValue(AdaptiveCard.refreshProperty, value);
    }

    @property(AdaptiveCard.authenticationProperty)
    get authentication(): Authentication | undefined {
        return this.getValue(AdaptiveCard.authenticationProperty);
    }

    set authentication(value: Authentication | undefined) {
        this.setValue(AdaptiveCard.authenticationProperty, value);
    }

    //#endregion

    protected getItemsCollectionPropertyName(): string {
        return "body";
    }

    protected getDefaultSerializationContext(): BaseSerializationContext {
        return new SerializationContext(this.version instanceof Version ? this.version : Versions.latest);
    }

    protected internalToJSON(target: PropertyBag, context: SerializationContext) {
        this.setValue(AdaptiveCard.versionProperty, context.targetVersion);

        super.internalToJSON(target, context);
    }

    getJsonTypeName(): string {
        return "AdaptiveCard";
    }
}
