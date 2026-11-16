import { Height } from "../Enum/Height.js";
import { Spacing } from "../Enum/Spacing.js";
import { TabSetSize } from "../Enum/TabSetSize.js";
import { TabPage } from "../Other/TabPage.js";
import type { HasHeight } from "../Support/HasHeight.js";
import type { HasSpacing } from "../Support/HasSpacing.js";
import { AbstractBlockElement } from "./AbstractBlockElement.js";

/**
 * An element that allows the end-user to navigate through pages using a tabbed interface.
 */
export class TabSet
  extends AbstractBlockElement
  implements HasHeight, HasSpacing
{
  public static make(): TabSet {
    return new TabSet();
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
   * Controls the amount of space between this element and the previous one.
   * No space will be added for the first element in a container.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  public spacing(spacing: Spacing): this {
    return this.set("spacing", spacing);
  }

  /**
   * Add a page to the tab set.
   */
  public addPages(page: TabPage | Iterable<TabPage>): this {
    if (!(page instanceof TabPage) && Symbol.iterator in Object(page)) {
      for (const item of page) {
        this.push("pages", item);
      }

      return this;
    }

    return this.push("pages", page);
  }

  /**
   * The pages in the tab set.
   * Valid values: "TabPage".
   */
  public pages(pages: Iterable<TabPage>): this {
    return this.addPages(pages);
  }

  /**
   * Controls the size of tab icons and titles.
   * Valid values: "Small", "Medium", "Large".
   */
  public size(size: TabSetSize): this {
    return this.set("size", size);
  }

  /**
   * Controls if the container should bleed into its parent. A bleeding container extends
   * into its parent's padding.
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

  public getType(): string {
    return "TabSet";
  }
}
