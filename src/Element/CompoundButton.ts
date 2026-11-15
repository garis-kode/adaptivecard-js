import { AbstractAction } from "../Action/AbstractAction.js";
import { Height } from "../Enum/Height.js";
import { HorizontalAlignment } from "../Enum/HorizontalAlignment.js";
import { Spacing } from "../Enum/Spacing.js";
import { IconInfo } from "../Other/IconInfo.js";
import { HasHeight } from "../Support/HasHeight.js";
import { HasHorizontalAlignment } from "../Support/HasHorizontalAlignment.js";
import { HasSpacing } from "../Support/HasSpacing.js";
import { AbstractBlockElement } from "./AbstractBlockElement.js";

/**
 * A special type of button with an icon, title and description.
 */
export class CompoundButton extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

  constructor(title: string | null = null, description: string | null = null) {
    super();
    if (title !== null) {
      this.title(title);
    }
    if (description !== null) {
      this.description(description);
    }
  }

  public static make(
    title: string | null = null,
    description: string | null = null,
  ): CompoundButton {
    return new CompoundButton(title, description);
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
   * The title of the button.
   */
  public title(title: string): this {
    return this.set("title", title);
  }

  /**
   * The description text of the button.
   */
  public description(description: string): this {
    return this.set("description", description);
  }

  /**
   * The badge to show on the button.
   */
  public badge(badge: string): this {
    return this.set("badge", badge);
  }

  /**
   * The icon to show on the button.
   * Valid values: "IconInfo".
   */
  public icon(icon: IconInfo): this {
    return this.set("icon", icon);
  }

  /**
   * An Action that will be invoked when the button is tapped or clicked.
   * Action.ShowCard is not supported.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.Popover", "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
   */
  public selectAction(action: AbstractAction): this {
    return this.set("selectAction", action);
  }

  public getType(): string {
    return "CompoundButton";
  }
}
