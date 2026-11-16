import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { ProgressBarColor } from "../../Enum/ProgressBarColor.js";
import { Spacing } from "../../Enum/Spacing.js";
import type { HasHeight } from "../../Support/HasHeight.js";
import type { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import type { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";

/**
 * A progress bar element, to represent a value within a range.
 */
export class ProgressBar
  extends AbstractBlockElement
  implements HasHeight, HasHorizontalAlignment, HasSpacing
{
  public static make(): ProgressBar {
    return new ProgressBar();
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
