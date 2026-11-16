import type { AbstractLayout } from "../Layout/AbstractLayout.js";
import type { AreaGridLayout } from "../Layout/AreaGridLayout.js";
import type { FlowLayout } from "../Layout/FlowLayout.js";
import type { StackLayout } from "../Layout/StackLayout.js";

export interface HasLayouts {
  /**
   * Add layouts associated with the container. The container can dynamically switch from one layout to
   * another as the card's width changes.
   */
  addLayouts(layout: AbstractLayout | Iterable<AbstractLayout>): this;

  /**
   * The layouts associated with the container. The container can dynamically switch
   * from one layout to another as the card's width changes.
   * Valid values: "Layout.Stack", "Layout.Flow", "Layout.AreaGrid".
   */
  layouts(layouts: Iterable<AbstractLayout>): this;

  /**
   * Add a layout that stacks elements on top of each other (the default layout) to the container's
   * layouts.
   */
  addStackLayout(callback?: ((layout: StackLayout) => void) | null): this;

  /**
   * Add a layout that spreads elements horizontally and wraps them across multiple rows, as needed, to the
   * container's layouts.
   */
  addFlowLayout(callback?: ((layout: FlowLayout) => void) | null): this;

  /**
   * Add a layout that divides the container into named areas, into which elements can be placed via the
   * `grid.area` property, to the container's layouts.
   */
  addAreaGridLayout(callback?: ((layout: AreaGridLayout) => void) | null): this;
}
