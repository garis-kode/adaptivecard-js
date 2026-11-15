import { Height } from '../Enum/Height.ts';
import { Spacing } from '../Enum/Spacing.ts';
import { TabSetSize } from '../Enum/TabSetSize.ts';
import { TabPage } from '../Other/TabPage.ts';
import { HasHeight } from '../Support/HasHeight.ts';
import { HasSpacing } from '../Support/HasSpacing.ts';
import { AbstractBlockElement } from './AbstractBlockElement.ts';

/**
 * An element that allows the end-user to navigate through pages using a tabbed interface.
 */
export class TabSet extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasSpacing = new HasSpacing(this);

  public static make(): TabSet {
    return new TabSet();
  }

  /**
   * Controls how the element should be vertically sized.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.hasHeight.height(height);
  }

  /**
   * Controls the amount of space between this element and the preceding one.
   * Valid values: "none", "extraSmall", "small", "default", "medium", "large", "extraLarge", "padding".
   */
  public spacing(spacing: Spacing): this {
    return this.hasSpacing.spacing(spacing);
  }

  /**
   * Add a page to the tab set.
   */
  public addPages(page: TabPage | Iterable<TabPage>): this {
    if (!(page instanceof TabPage) && Symbol.iterator in Object(page)) {
      for (const item of page) {
        this.push('pages', item);
      }

      return this;
    }

    return this.push('pages', page);
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
    return this.set('size', size);
  }

  /**
   * Controls if the container should bleed into its parent. A bleeding container extends
   * into its parent's padding.
   */
  public bleed(bleed = true): this {
    return this.set('bleed', bleed);
  }

  /**
   * The minimum height, in pixels, of the container, in the `<number>px` format.
   * Valid values: "<number>px".
   */
  public minHeight(minHeight: string): this {
    return this.set('minHeight', minHeight);
  }

  public getType(): string {
    return 'TabSet';
  }
}
