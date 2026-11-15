import { Spacing } from "../Enum/Spacing.js";
import { AbstractLayout } from "./AbstractLayout.js";
import { GridArea } from "./GridArea.js";

/**
 * Area grid layout: positions elements in named grid areas.
 */
export class AreaGridLayout extends AbstractLayout {
  public static make(): AreaGridLayout {
    return new AreaGridLayout();
  }

  /**
   * Add columns to the grid layout, defined as a percentage of the available width or in pixels using
   * the `<number>px` format.
   */
  public addColumns(column: number | string | Iterable<number | string>): this {
    if (
      typeof column !== "string" &&
      typeof column !== "number" &&
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
   * The columns in the grid layout, defined as a percentage of the available
   * width or in pixels using the `<number>px` format.
   */
  public columns(columns: Iterable<number | string>): this {
    return this.addColumns(columns);
  }

  /**
   * Add areas to the grid layout.
   */
  public addAreas(area: GridArea | Iterable<GridArea>): this {
    if (!(area instanceof GridArea) && Symbol.iterator in Object(area)) {
      for (const item of area) {
        this.push("areas", item);
      }

      return this;
    }

    return this.push("areas", area);
  }

  /**
   * The areas in the grid layout mapping named areas to rows and columns.
   * Valid values: "GridArea".
   */
  public areas(areas: Iterable<GridArea>): this {
    return this.addAreas(areas);
  }

  /**
   * The space between columns.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  public columnSpacing(spacing: Spacing): this {
    return this.set("columnSpacing", spacing);
  }

  /**
   * The space between rows.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  public rowSpacing(spacing: Spacing): this {
    return this.set("rowSpacing", spacing);
  }

  public getType(): string {
    return "Layout.AreaGrid";
  }
}
