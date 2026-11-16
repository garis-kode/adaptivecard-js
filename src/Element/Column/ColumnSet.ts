import { AbstractAction } from "../../Action/AbstractAction.js";
import { ContainerStyle } from "../../Enum/ContainerStyle.js";
import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { Spacing } from "../../Enum/Spacing.js";
import { Width } from "../../Enum/Width.js";
import type { HasHeight } from "../../Support/HasHeight.js";
import type { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import type { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";
import { Column } from "./Column.js";

/**
 * Splits the available horizontal space into separate columns, so elements can be organized in a row.
 */
export class ColumnSet
  extends AbstractBlockElement
  implements HasHeight, HasHorizontalAlignment, HasSpacing
{
  public static make(): ColumnSet {
    return new ColumnSet();
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
   * Controls the amount of space between this element and the previous one.
   * No space will be added for the first element in a container.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  public spacing(spacing: Spacing): this {
    return this.set("spacing", spacing);
  }

  /**
   * Add a column to the column set.
   */
  public addColumns(column: Column | Iterable<Column>): this {
    if (!(column instanceof Column) && Symbol.iterator in Object(column)) {
      for (const item of column) {
        this.push("columns", item);
      }

      return this;
    }

    return this.push("columns", column);
  }

  /**
   * The columns in the set.
   * Valid values: "Column".
   */
  public columns(columns: Iterable<Column>): this {
    return this.addColumns(columns);
  }

  /**
   * Create, configure and append a column in one call.
   */
  public column(
    width: Width | string | number | null = null,
    configure: ((column: Column) => unknown) | null = null,
  ): this {
    const column = new Column();
    if (width !== null) {
      column.width(width);
    }
    if (configure !== null) {
      configure(column);
    }

    return this.addColumns(column);
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
   * Controls if the container should bleed into its parent. A bleeding container extends into its parent's padding.
   */
  public bleed(bleed = true): this {
    return this.set("bleed", bleed);
  }

  /**
   * The minimum height, in pixels, of the container, in the `<number>px` format.
   * Valid values: "<number>px".
   */
  public minHeight(minHeight: string): this {
    return this.set("minHeight", minHeight);
  }

  /**
   * The minimum width of the column set. `auto` will automatically adjust the column set's
   * minimum width according to its content and using the `<number>px` format will give the
   * column set an explicit minimum width in pixels. A scrollbar will be displayed if the
   * available width is less than the specified minimum width.
   * Valid values: "auto", "<number>px".
   */
  public minWidth(minWidth: Width | string): this {
    return this.set("minWidth", minWidth);
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
   * An Action that will be invoked when the element is tapped or clicked.
   * Action.ShowCard is not supported.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.Popover", "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
   */
  public selectAction(action: AbstractAction): this {
    return this.set("selectAction", action);
  }

  public getType(): string {
    return "ColumnSet";
  }
}
