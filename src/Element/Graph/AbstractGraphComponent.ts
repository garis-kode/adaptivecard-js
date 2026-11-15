import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { Spacing } from "../../Enum/Spacing.js";
import { HasHeight } from "../../Support/HasHeight.js";
import { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";

export abstract class AbstractGraphComponent extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

  public constructor() {
    super();
    this.set("name", this.name());
  }

  protected abstract name(): string;

  /**
   * The height of the element. When set to `stretch`, the element will use
   * the remaining vertical space in its container.
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
   * Controls the amount of space between this element and the previous one.
   * No space will be added for the first element in a container.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  public spacing(spacing: Spacing): this {
    return this.hasSpacing.spacing(spacing);
  }

  public getType(): string {
    return "Component";
  }
}
