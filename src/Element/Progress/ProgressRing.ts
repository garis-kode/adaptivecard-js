import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { ProgressRingLabelPosition } from "../../Enum/ProgressRingLabelPosition.js";
import { ProgressRingSize } from "../../Enum/ProgressRingSize.js";
import { Spacing } from "../../Enum/Spacing.js";
import type { HasHeight } from "../../Support/HasHeight.js";
import type { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import type { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";

/**
 * A spinning ring element, to indicate progress.
 */
export class ProgressRing
  extends AbstractBlockElement
  implements HasHeight, HasHorizontalAlignment, HasSpacing
{
  constructor(label: string | null = null) {
    super();
    if (label !== null) {
      this.label(label);
    }
  }

  public static make(label: string | null = null): ProgressRing {
    return new ProgressRing(label);
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
   * The label of the progress ring.
   */
  public label(label: string): this {
    return this.set("label", label);
  }

  /**
   * Controls the relative position of the label to the progress ring.
   * Valid values: "Before", "After", "Above", "Below".
   */
  public labelPosition(position: ProgressRingLabelPosition): this {
    return this.set("labelPosition", position);
  }

  /**
   * The size of the progress ring.
   * Valid values: "Tiny", "Small", "Medium", "Large".
   */
  public size(size: ProgressRingSize): this {
    return this.set("size", size);
  }

  public getType(): string {
    return "ProgressRing";
  }
}
