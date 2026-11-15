import { ContainerStyle } from "../../Enum/ContainerStyle.js";
import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { Spacing } from "../../Enum/Spacing.js";
import { VerticalAlignment } from "../../Enum/VerticalAlignment.js";
import { Width } from "../../Enum/Width.js";
import { HasHeight } from "../../Support/HasHeight.js";
import { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";
import { TextBlock } from "../TextBlock.js";
import { TableColumnDefinition } from "./TableColumnDefinition.js";
import { TableRow } from "./TableRow.js";

/**
 * Use tables to display data in a tabular way, with rows, columns and cells.
 */
export class Table extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

  constructor(
    columns: Iterable<TableColumnDefinition> | null = null,
    rows: Iterable<TableRow> | null = null,
  ) {
    super();
    if (columns !== null) {
      this.columns(columns);
    }
    if (rows !== null) {
      this.rows(rows);
    }
  }

  public static make(
    columns: Iterable<TableColumnDefinition> | null = null,
    rows: Iterable<TableRow> | null = null,
  ): Table {
    return new Table(columns, rows);
  }

  /**
   * Controls how the element should be vertically sized.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.hasHeight.height(height);
  }

  /**
   * Controls how the element should be horizontally aligned.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalAlignment(alignment: HorizontalAlignment): this {
    return this.hasHorizontalAlignment.horizontalAlignment(alignment);
  }

  /**
   * Controls the amount of space between this element and the preceding one.
   * Valid values: "none", "extraSmall", "small", "default", "medium", "large", "extraLarge", "padding".
   */
  public spacing(spacing: Spacing): this {
    return this.hasSpacing.spacing(spacing);
  }

  /**
   * Add columns to the table.
   */
  public addColumns(
    column: TableColumnDefinition | Iterable<TableColumnDefinition>,
  ): this {
    if (
      !(column instanceof TableColumnDefinition) &&
      Symbol.iterator in Object(column)
    ) {
      for (const item of column) {
        this.push("columns", item);
      }

      return this;
    }

    return this.push("columns", column);
  }

  /**
   * The columns in the table.
   * Valid values: "ColumnDefinition".
   */
  public columns(columns: Iterable<TableColumnDefinition>): this {
    return this.addColumns(columns);
  }

  /**
   * Add rows to the table.
   */
  public addRows(row: TableRow | Iterable<TableRow>): this {
    if (!(row instanceof TableRow) && Symbol.iterator in Object(row)) {
      for (const item of row) {
        this.push("rows", item);
      }

      return this;
    }

    return this.push("rows", row);
  }

  /**
   * The rows of the table.
   * Valid values: "TableRow".
   */
  public rows(rows: Iterable<TableRow>): this {
    return this.addRows(rows);
  }

  /**
   * Convenience: add a row of plain-text cells.
   */
  public addTextRow(cells: string[]): this {
    const row = new TableRow();
    for (const text of cells) {
      row.addTextCell(text, (tb: TextBlock) => tb.wrap(true));
    }

    return this.addRows(row);
  }

  /**
   * Controls if grid lines should be displayed.
   */
  public showGridLines(value = true): this {
    return this.set("showGridLines", value);
  }

  /**
   * Controls whether the first row of the table should be treated as a header.
   */
  public firstRowAsHeaders(value = true): this {
    return this.set("firstRowAsHeaders", value);
  }

  /**
   * Controls if the container should have rounded corners.
   */
  public roundedCorners(value = true): this {
    return this.set("roundedCorners", value);
  }

  /**
   * Controls if a border should be displayed around the container.
   */
  public showBorder(value = true): this {
    return this.set("showBorder", value);
  }

  /**
   * The minimum width of the table in pixels. `auto` will automatically adjust the
   * table's minimum width according to its content and using the `<number>px` format will
   * give the table an explicit minimum width in pixels. A scrollbar will be displayed if
   * the available width is less than the specified minimum width.
   * Valid values: "auto", "<number>px".
   */
  public minWidth(width: Width | string): this {
    return this.set("minWidth", width);
  }

  /**
   * The style of the container. Container styles control the colors of the background,
   * border and text inside the container, in such a way that contrast requirements are always met.
   * Valid values: "default", "emphasis", "accent", "good", "attention", "warning".
   */
  public style(style: ContainerStyle): this {
    return this.set("style", style);
  }

  /**
   * The style of the grid lines between cells.
   * Valid values: "default", "emphasis", "accent", "good", "attention", "warning".
   */
  public gridStyle(style: ContainerStyle): this {
    return this.set("gridStyle", style);
  }

  /**
   * Controls how the content of every cell in the table should be horizontally aligned by default.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalCellContentAlignment(alignment: HorizontalAlignment): this {
    return this.set("horizontalCellContentAlignment", alignment);
  }

  /**
   * Controls how the content of every cell in the table should be vertically aligned by default.
   * Valid values: "Top", "Center", "Bottom".
   */
  public verticalCellContentAlignment(alignment: VerticalAlignment): this {
    return this.set("verticalCellContentAlignment", alignment);
  }

  public getType(): string {
    return "Table";
  }
}
