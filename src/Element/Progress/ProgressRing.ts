import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { ProgressRingLabelPosition } from "../../Enum/ProgressRingLabelPosition.js";
import { ProgressRingSize } from "../../Enum/ProgressRingSize.js";
import { Spacing } from "../../Enum/Spacing.js";
import { HasHeight } from "../../Support/HasHeight.js";
import { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";

/**
 * A spinning ring element, to indicate progress.
 */
export class ProgressRing extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

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
