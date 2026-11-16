import { Height } from "../../Enum/Height.js";
import { PageAnimation } from "../../Enum/PageAnimation.js";
import { Spacing } from "../../Enum/Spacing.js";
import type { HasHeight } from "../../Support/HasHeight.js";
import type { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";
import { CarouselPage } from "./CarouselPage.js";

/**
 * A carousel with sliding pages.
 */
export class Carousel
  extends AbstractBlockElement
  implements HasHeight, HasSpacing
{
  public static make(): Carousel {
    return new Carousel();
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
   * Add a page to the carousel.
   */
  public addPages(page: CarouselPage | Iterable<CarouselPage>): this {
    if (!(page instanceof CarouselPage) && Symbol.iterator in Object(page)) {
      for (const item of page) {
        this.push("pages", item);
      }

      return this;
    }

    return this.push("pages", page);
  }

  /**
   * The pages in the carousel.
   * Valid values: "CarouselPage".
   */
  public pages(pages: Iterable<CarouselPage>): this {
    return this.addPages(pages);
  }

  /**
   * The interval, in milliseconds, between automatic page advances. Leave undefined to disable
   * auto-rotation; the minimum accepted value is 1000.
   */
  public autoLoopInterval(milliseconds: number): this {
    return this.set("autoLoopInterval", milliseconds);
  }

  /**
   * Controls the type of animation to use to navigate between pages.
   * Valid values: "Slide", "CrossFade", "None".
   */
  public pageAnimation(animation: PageAnimation): this {
    return this.set("pageAnimation", animation);
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

  public getType(): string {
    return "Carousel";
  }
}
