import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { ProgressBarColor } from "../../Enum/ProgressBarColor.js";
import { Spacing } from "../../Enum/Spacing.js";
import { HasHeight } from "../../Support/HasHeight.js";
import { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";

/**
 * A progress bar element, to represent a value within a range.
 */
export class ProgressBar extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

  public static make(): ProgressBar {
    return new ProgressBar();
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
   * The value of the progress bar. Must be between 0 and `max`.
   */
  public value(value: number | null): this {
    return this.set("value", value);
  }

  /**
   * The maximum value of the progress bar.
   */
  public max(max: number): this {
    return this.set("max", max);
  }

  /**
   * The color of the progress bar. `color` has no effect when the `ProgressBar` is in
   * indeterminate mode, in which case the "accent" color is always used.
   * Valid values: "Accent", "Good", "Warning", "Attention".
   */
  public color(color: ProgressBarColor): this {
    return this.set("color", color);
  }

  public getType(): string {
    return "ProgressBar";
  }
}
