import { AbstractAction } from "../Action/AbstractAction.js";
import { Height } from "../Enum/Height.js";
import { HorizontalAlignment } from "../Enum/HorizontalAlignment.js";
import { Spacing } from "../Enum/Spacing.js";
import { IconInfo } from "../Other/IconInfo.js";
import type { HasHeight } from "../Support/HasHeight.js";
import type { HasHorizontalAlignment } from "../Support/HasHorizontalAlignment.js";
import type { HasSpacing } from "../Support/HasSpacing.js";
import { AbstractBlockElement } from "./AbstractBlockElement.js";

/**
 * A special type of button with an icon, title and description.
 */
export class CompoundButton
  extends AbstractBlockElement
  implements HasHeight, HasHorizontalAlignment, HasSpacing
{
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
