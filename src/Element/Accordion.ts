import { Height } from '../Enum/Height.ts';
import { AccordionPage } from '../Other/AccordionPage.ts';
import { HasHeight } from '../Support/HasHeight.ts';
import { AbstractBlockElement } from './AbstractBlockElement.ts';

/**
 * An element that allows the end-user to toggle the display of content by expanding
 * or collapsing pages.
 */
export class Accordion extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);

  public static make(): Accordion {
    return new Accordion();
  }

  /**
   * Controls how the element should be vertically sized.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.hasHeight.height(height);
  }

  /**
   * Controls whether all accordion pages can be collapsed at the same time.
   */
  public allowCollapseAllPages(allow = true): this {
    return this.set('allowCollapseAllPages', allow);
  }

  /**
   * Controls whether multiple accordion pages can be expanded at the same time.
   */
  public allowMultipleExpandedPages(allow = true): this {
    return this.set('allowMultipleExpandedPages', allow);
  }

  /**
   * Add a page to the accordion.
   */
  public addPages(page: AccordionPage | Iterable<AccordionPage>): this {
    if (!(page instanceof AccordionPage) && Symbol.iterator in Object(page)) {
      for (const item of page) {
        this.push('pages', item);
      }

      return this;
    }

    return this.push('pages', page);
  }

  /**
   * The pages in the accordion.
   * Valid values: "AccordionPage".
   */
  public pages(pages: Iterable<AccordionPage>): this {
    return this.addPages(pages);
  }

  /**
   * The minimum height, in pixels, of the container, in the `<number>px` format.
   * Valid values: "<number>px".
   */
  public minHeight(minHeight: string): this {
    return this.set('minHeight', minHeight);
  }

  public getType(): string {
    return 'Accordion';
  }
}
