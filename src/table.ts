// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import {
    CardElement,
    StylableCardElementContainer,
    SerializationContext,
    Container,
    ContainerStyleProperty
} from "./card-elements";
import { HorizontalAlignment, VerticalAlignment, SizeUnit, ValidationEvent } from "./enums";
import {
    BaseSerializationContext,
    BoolProperty,
    CustomProperty,
    EnumProperty,
    property,
    PropertyBag,
    PropertyDefinition,
    SerializableObject,
    SerializableObjectCollectionProperty,
    Versions
} from "./serialization";
import { SizeAndUnit } from "./shared";
import { Strings } from "./strings";

export class TableColumnDefinition extends SerializableObject {
    //#region Schema

    static readonly horizontalCellContentAlignmentProperty = new EnumProperty(
        Versions.v1_5,
        "horizontalCellContentAlignment",
        HorizontalAlignment
    );
    static readonly verticalCellContentAlignmentProperty = new EnumProperty(
        Versions.v1_5,
        "verticalCellContentAlignment",
        VerticalAlignment
    );

    static readonly widthProperty = new CustomProperty<SizeAndUnit>(
        Versions.v1_5,
        "width",
        (
            sender: SerializableObject,
            prop: PropertyDefinition,
            source: PropertyBag,
            context: BaseSerializationContext
        ) => {
            let result: SizeAndUnit = prop.defaultValue;
            const value = source[prop.name];
            let invalidWidth = false;

            if (typeof value === "number" && !isNaN(value)) {
                result = new SizeAndUnit(value, SizeUnit.Weight);
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
                    ValidationEvent.InvalidPropertyValue,
                    Strings.errors.invalidColumnWidth(value)
                );
            }

            return result;
        },
        (
            _sender: SerializableObject,
            _property: PropertyDefinition,
            target: PropertyBag,
            value: SizeAndUnit,
            context: BaseSerializationContext
        ) => {
            if (value.unit === SizeUnit.Pixel) {
                context.serializeValue(target, "width", value.physicalSize + "px");
            } else {
                context.serializeNumber(target, "width", value.physicalSize);
            }
        },
        new SizeAndUnit(1, SizeUnit.Weight)
    );

    @property(TableColumnDefinition.horizontalCellContentAlignmentProperty)
    horizontalCellContentAlignment?: HorizontalAlignment;

    @property(TableColumnDefinition.verticalCellContentAlignmentProperty)
    verticalCellContentAlignment?: VerticalAlignment;

    @property(TableColumnDefinition.widthProperty)
    width: SizeAndUnit = new SizeAndUnit(1, SizeUnit.Weight);

    protected getSchemaKey(): string {
        return "ColumnDefinition";
    }
}

export abstract class StylableContainer<T extends CardElement> extends StylableCardElementContainer {
    protected _items: T[] = [];

    protected abstract getCollectionPropertyName(): string;

    protected internalToJSON(target: PropertyBag, context: SerializationContext) {
        super.internalToJSON(target, context);

        context.serializeArray(target, this.getCollectionPropertyName(), this._items);
    }

    protected internalAddItem(item: T) {
        if (item.parent) {
            throw new Error(Strings.errors.elementAlreadyParented());
        }

        this._items.push(item);

        item.setParent(this);
    }

    getItemCount(): number {
        return this._items.length;
    }

    getItemAt(index: number): T {
        return this._items[index];
    }
}

export type CellType = "data" | "header";

export class TableCell extends Container {
    getJsonTypeName(): string {
        return "TableCell";
    }

    get isStandalone(): boolean {
        return false;
    }
}

export class TableRow extends StylableContainer<TableCell> {
    //#region Schema

    static readonly styleProperty = new ContainerStyleProperty(Versions.v1_5, "style");
    static readonly horizontalCellContentAlignmentProperty = new EnumProperty(
        Versions.v1_5,
        "horizontalCellContentAlignment",
        HorizontalAlignment
    );
    static readonly verticalCellContentAlignmentProperty = new EnumProperty(
        Versions.v1_5,
        "verticalCellContentAlignment",
        VerticalAlignment
    );

    @property(TableRow.horizontalCellContentAlignmentProperty)
    horizontalCellContentAlignment?: HorizontalAlignment;

    @property(TableRow.verticalCellContentAlignmentProperty)
    verticalCellContentAlignment?: VerticalAlignment;

    //#endregion

    protected getCollectionPropertyName(): string {
        return "cells";
    }

    addCell(cell: TableCell) {
        this.internalAddItem(cell);
    }

    getJsonTypeName(): string {
        return "TableRow";
    }

    get isStandalone(): boolean {
        return false;
    }
}

export class Table extends StylableContainer<TableRow> {
    //#region Schema

    private static readonly _columnsProperty = new SerializableObjectCollectionProperty(
        Versions.v1_5,
        "columns",
        TableColumnDefinition
    );

    static readonly firstRowAsHeadersProperty = new BoolProperty(
        Versions.v1_5,
        "firstRowAsHeaders",
        true
    );
    static readonly showGridLinesProperty = new BoolProperty(Versions.v1_5, "showGridLines", true);
    static readonly gridStyleProperty = new ContainerStyleProperty(Versions.v1_5, "gridStyle");
    static readonly horizontalCellContentAlignmentProperty = new EnumProperty(
        Versions.v1_5,
        "horizontalCellContentAlignment",
        HorizontalAlignment
    );
    static readonly verticalCellContentAlignmentProperty = new EnumProperty(
        Versions.v1_5,
        "verticalCellContentAlignment",
        VerticalAlignment
    );

    @property(Table._columnsProperty)
    private _columns: TableColumnDefinition[] = [];

    @property(Table.firstRowAsHeadersProperty)
    firstRowAsHeaders: boolean = true;

    @property(Table.showGridLinesProperty)
    showGridLines: boolean = true;

    @property(Table.gridStyleProperty)
    gridStyle?: string;

    @property(Table.horizontalCellContentAlignmentProperty)
    horizontalCellContentAlignment?: HorizontalAlignment;

    @property(Table.verticalCellContentAlignmentProperty)
    verticalCellContentAlignment?: VerticalAlignment;

    //#endregion

    protected getCollectionPropertyName(): string {
        return "rows";
    }

    addColumn(column: TableColumnDefinition) {
        this._columns.push(column);
    }

    getColumnCount(): number {
        return this._columns.length;
    }

    getColumnAt(index: number): TableColumnDefinition {
        return this._columns[index];
    }

    addRow(row: TableRow) {
        this.internalAddItem(row);
    }

    getJsonTypeName(): string {
        return "Table";
    }
}
