import { AbstractLayout } from "../Layout/AbstractLayout.js";
import { AreaGridLayout } from "../Layout/AreaGridLayout.js";
import { FlowLayout } from "../Layout/FlowLayout.js";
import { StackLayout } from "../Layout/StackLayout.js";
import type { Node } from "../Node.js";

export class HasLayouts<T extends Node> {
  public constructor(private readonly host: T) {}

  /**
   * Add layouts associated with the container. The container can dynamically switch from one layout to
   * another as the card's width changes.
   */
  public addLayouts(layout: AbstractLayout | Iterable<AbstractLayout>): T {
    if (
      !(layout instanceof AbstractLayout) &&
      Symbol.iterator in Object(layout)
    ) {
      for (const item of layout) {
        this.host.pushProperty("layouts", item);
      }

      return this.host;
    }

    return this.host.pushProperty("layouts", layout);
  }

  /**
   * The layouts associated with the container. The container can dynamically switch
   * from one layout to another as the card's width changes.
   * Valid values: "Layout.Stack", "Layout.Flow", "Layout.AreaGrid".
   */
  public layouts(layouts: Iterable<AbstractLayout>): T {
    return this.addLayouts(layouts);
  }

  /**
   * Add a layout that stacks elements on top of each other (the default layout) to the container's
   * layouts.
   */
  public addStackLayout(
    callback: ((layout: StackLayout) => void) | null = null,
  ): T {
    const layout = StackLayout.make();
    if (callback !== null) {
      callback(layout);
    }

    return this.addLayouts(layout);
  }

  /**
   * Add a layout that spreads elements horizontally and wraps them across multiple rows, as needed, to the
   * container's layouts.
   */
  public addFlowLayout(
    callback: ((layout: FlowLayout) => void) | null = null,
  ): T {
    const layout = FlowLayout.make();
    if (callback !== null) {
      callback(layout);
    }

    return this.addLayouts(layout);
  }

  /**
   * Add a layout that divides the container into named areas, into which elements can be placed via the
   * `grid.area` property, to the container's layouts.
   */
  public addAreaGridLayout(
    callback: ((layout: AreaGridLayout) => void) | null = null,
  ): T {
    const layout = AreaGridLayout.make();
    if (callback !== null) {
      callback(layout);
    }

    return this.addLayouts(layout);
  }
}
