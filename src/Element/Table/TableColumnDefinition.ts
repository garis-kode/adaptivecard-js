import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { VerticalAlignment } from "../../Enum/VerticalAlignment.js";
import { Width } from "../../Enum/Width.js";
import { Node } from "../../Node.js";
import { HasKey } from "../../Support/HasKey.js";

/**
 * Defines a column in a Table element.
 */
export class TableColumnDefinition extends Node {
  private readonly hasKey = new HasKey(this);

  constructor(width: Width | string | number | null = null) {
    super();
    if (width !== null) {
      this.width(width);
    }
  }

  public static make(
    width: Width | string | number | null = null,
  ): TableColumnDefinition {
    return new TableColumnDefinition(width);
  }

  /**
   * Key that identifies the element in the list of items.
   */
  public key(key: string): this {
    return this.hasKey.key(key);
  }

  /**
   * The width of the column in the table. If expressed as a number, represents the relative
   * weight of the column in the table. If expressed as a string, `auto` will automatically
   * adjust the column's width according to its content and using the `<number>px` format will
   * give the column an explicit width in pixels.
   * Valid values: "auto", "<number>px".
   */
  public width(width: Width | string | number): this {
    return this.set("width", width);
  }

  /**
   * Controls how the content of every cell in the table should be horizontally aligned by default.
   * This property overrides the `horizontalCellContentAlignment` property of the table.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalCellContentAlignment(alignment: HorizontalAlignment): this {
    return this.set("horizontalCellContentAlignment", alignment);
  }

  /**
   * Controls how the content of every cell in the column should be vertically aligned by default.
   * This property overrides the `verticalCellContentAlignment` property of the table.
   * Valid values: "Top", "Center", "Bottom".
   */
  public verticalCellContentAlignment(alignment: VerticalAlignment): this {
    return this.set("verticalCellContentAlignment", alignment);
  }

  public getType(): string | null {
    return null;
  }
}
