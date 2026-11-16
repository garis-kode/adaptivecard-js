import { ContainerStyle } from "../../Enum/ContainerStyle.js";
import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { Spacing } from "../../Enum/Spacing.js";
import { VerticalAlignment } from "../../Enum/VerticalAlignment.js";
import type { HasHeight } from "../../Support/HasHeight.js";
import type { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import type { HasSeparator } from "../../Support/HasSeparator.js";
import type { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractElement } from "../AbstractElement.js";
import { TextBlock } from "../TextBlock.js";
import { TableCell } from "./TableCell.js";

/**
 * Represents a row of cells in a table.
 */
export class TableRow
  extends AbstractElement
  implements HasHeight, HasHorizontalAlignment, HasSeparator, HasSpacing
{
  public static make(): TableRow {
    return new TableRow();
  }

  /**
   * The height of the element. When set to `stretch`, the element will use
   * the remaining vertical space in its container.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.set("height", height);
  }

  /**
   * Controls how the element should be horizontally aligned.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalAlignment(alignment: HorizontalAlignment): this {
    return this.set("horizontalAlignment", alignment);
  }

  /**
   * Controls whether a separator line should be displayed above the element
   * to visually separate it from the previous element. No separator will be
   * displayed for the first element in a container, even if this property is
   * set to true.
   */
  public separator(separator: boolean = true): this {
    return this.set("separator", separator);
  }

  /**
   * Controls the amount of space between this element and the previous one.
   * No space will be added for the first element in a container.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  public spacing(spacing: Spacing): this {
    return this.set("spacing", spacing);
  }

  /**
   * Add cells to the row.
   */
  public addCells(cell: TableCell | Iterable<TableCell>): this {
    if (!(cell instanceof TableCell) && Symbol.iterator in Object(cell)) {
      for (const item of cell) {
        this.push("cells", item);
      }

      return this;
    }

    return this.push("cells", cell);
  }

  /**
   * The cells in the row.
   * Valid values: "TableCell".
   */
  public cells(cells: Iterable<TableCell>): this {
    return this.addCells(cells);
  }

  /**
   * Convenience: add a cell containing a single TextBlock.
   */
  public addTextCell(
    text: string,
    configure: ((textBlock: TextBlock) => unknown) | null = null,
  ): this {
    const cell = new TableCell();
    cell.addTextBlock(text, configure);

    return this.addCells(cell);
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
   * Controls how the content of every cell in the row should be horizontally aligned by default.
   * This property overrides the `horizontalCellContentAlignment` property of the table and columns.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalCellContentAlignment(alignment: HorizontalAlignment): this {
    return this.set("horizontalCellContentAlignment", alignment);
  }

  /**
   * Controls how the content of every cell in the row should be vertically aligned by default.
   * This property overrides the `verticalCellContentAlignment` property of the table and columns.
   * Valid values: "Top", "Center", "Bottom".
   */
  public verticalCellContentAlignment(alignment: VerticalAlignment): this {
    return this.set("verticalCellContentAlignment", alignment);
  }

  public getType(): string {
    return "TableRow";
  }
}
