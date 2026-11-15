import { BadgeAppearance } from "../Enum/BadgeAppearance.js";
import { BadgeShape } from "../Enum/BadgeShape.js";
import { BadgeSize } from "../Enum/BadgeSize.js";
import { BadgeStyle } from "../Enum/BadgeStyle.js";
import { Height } from "../Enum/Height.js";
import { HorizontalAlignment } from "../Enum/HorizontalAlignment.js";
import { IconPosition } from "../Enum/IconPosition.js";
import { Spacing } from "../Enum/Spacing.js";
import { HasHeight } from "../Support/HasHeight.js";
import { HasHorizontalAlignment } from "../Support/HasHorizontalAlignment.js";
import { HasSpacing } from "../Support/HasSpacing.js";
import { AbstractBlockElement } from "./AbstractBlockElement.js";

/**
 * A badge element to show an icon and/or text in a compact form over a colored background.
 */
export class Badge extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

  constructor(
    text: string | null = null,
    size: BadgeSize | null = null,
    style: BadgeStyle | null = null,
  ) {
    super();
    if (text !== null) {
      this.text(text);
    }
    if (size !== null) {
      this.size(size);
    }
    if (style !== null) {
      this.style(style);
    }
  }

  public static make(
    text: string | null = null,
    size: BadgeSize | null = null,
    style: BadgeStyle | null = null,
  ): Badge {
    return new Badge(text, size, style);
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
   * The text to display.
   */
  public text(text: string): this {
    return this.set("text", text);
  }

  /**
   * The size of the badge.
   * Valid values: "Medium", "Large", "ExtraLarge".
   */
  public size(size: BadgeSize): this {
    return this.set("size", size);
  }

  /**
   * Controls the shape of the badge.
   * Valid values: "Square", "Rounded", "Circular".
   */
  public shape(shape: BadgeShape): this {
    return this.set("shape", shape);
  }

  /**
   * The style of the badge.
   * Valid values: "Default", "Subtle", "Informative", "Accent", "Good", "Attention", "Warning".
   */
  public style(style: BadgeStyle): this {
    return this.set("style", style);
  }

  /**
   * Controls the strength of the background color.
   * Valid values: "Filled", "Tint".
   */
  public appearance(appearance: BadgeAppearance): this {
    return this.set("appearance", appearance);
  }

  /**
   * The name of an icon from the Adaptive Card icon catalog to display,
   * in the `<icon-name>[,regular|filled]` format. If the style is not specified,
   * the regular style is used.
   */
  public icon(icon: string): this {
    return this.set("icon", icon);
  }

  /**
   * Controls the position of the icon.
   * Valid values: "Before", "After".
   */
  public iconPosition(iconPosition: IconPosition): this {
    return this.set("iconPosition", iconPosition);
  }

  /**
   * Controls the tooltip text to display when the badge is hovered over.
   */
  public tooltip(tooltip: string): this {
    return this.set("tooltip", tooltip);
  }

  public getType(): string {
    return "Badge";
  }
}
