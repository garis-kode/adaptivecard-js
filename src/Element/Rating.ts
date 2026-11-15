import { Height } from "../Enum/Height.js";
import { HorizontalAlignment } from "../Enum/HorizontalAlignment.js";
import { RatingColor } from "../Enum/RatingColor.js";
import { RatingSize } from "../Enum/RatingSize.js";
import { RatingStyle } from "../Enum/RatingStyle.js";
import { Spacing } from "../Enum/Spacing.js";
import { HasHeight } from "../Support/HasHeight.js";
import { HasHorizontalAlignment } from "../Support/HasHorizontalAlignment.js";
import { HasSpacing } from "../Support/HasSpacing.js";
import { AbstractBlockElement } from "./AbstractBlockElement.js";

/**
 * A read-only star rating element, to display the rating of something.
 */
export class Rating extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

  public static make(): Rating {
    return new Rating();
  }

  /**
   * Controls how the element should be vertically sized.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.hasHeight.height(height);
  }

  /**
   * Controls how the element should be horizontally aligned.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalAlignment(alignment: HorizontalAlignment): this {
    return this.hasHorizontalAlignment.horizontalAlignment(alignment);
  }

  /**
   * Controls the amount of space between this element and the preceding one.
   * Valid values: "none", "extraSmall", "small", "default", "medium", "large", "extraLarge", "padding".
   */
  public spacing(spacing: Spacing): this {
    return this.hasSpacing.spacing(spacing);
  }

  /**
   * The value of the rating. Must be between 0 and `max`.
   */
  public value(value: number): this {
    return this.set("value", value);
  }

  /**
   * The number of stars to display.
   */
  public max(max: number): this {
    return this.set("max", max);
  }

  /**
   * The number of "votes" associated with the rating.
   */
  public count(count: number): this {
    return this.set("count", count);
  }

  /**
   * The size of the stars.
   * Valid values: "Medium", "Large".
   */
  public size(size: RatingSize): this {
    return this.set("size", size);
  }

  /**
   * The color of the stars.
   * Valid values: "Neutral", "Marigold".
   */
  public color(color: RatingColor): this {
    return this.set("color", color);
  }

  /**
   * The style of the stars.
   * Valid values: "Default", "Compact".
   */
  public style(style: RatingStyle): this {
    return this.set("style", style);
  }

  public getType(): string {
    return "Rating";
  }
}
