import { AbstractAction } from "../Action/AbstractAction.js";
import { Colors } from "../Enum/Colors.js";
import { HorizontalAlignment } from "../Enum/HorizontalAlignment.js";
import { IconSize } from "../Enum/IconSize.js";
import { IconStyle } from "../Enum/IconStyle.js";
import { Spacing } from "../Enum/Spacing.js";
import type { HasHorizontalAlignment } from "../Support/HasHorizontalAlignment.js";
import type { HasSpacing } from "../Support/HasSpacing.js";
import { AbstractBlockElement } from "./AbstractBlockElement.js";

/**
 * A standalone icon element. Icons can be picked from the vast Adaptive Card icon catalog.
 */
export class Icon
  extends AbstractBlockElement
  implements HasHorizontalAlignment, HasSpacing
{
  public static make(): Icon {
    return new Icon();
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
   * The name of the icon to display.
   */
  public name(name: string): this {
    return this.set("name", name);
  }

  /**
   * The color of the icon.
   * Valid values: "Default", "Dark", "Light", "Accent", "Good", "Warning", "Attention".
   */
  public color(color: Colors): this {
    return this.set("color", color);
  }

  /**
   * The size of the icon.
   * Valid values: "xxSmall", "xSmall", "Small", "Standard", "Medium", "Large", "xLarge", "xxLarge".
   */
  public size(size: IconSize): this {
    return this.set("size", size);
  }

  /**
   * The style of the icon.
   * Valid values: "Regular", "Filled".
   */
  public style(style: IconStyle): this {
    return this.set("style", style);
  }

  /**
   * An Action that will be invoked when the icon is tapped or clicked.
   * Action.ShowCard is not supported.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.Popover", "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
   */
  public selectAction(action: AbstractAction): this {
    return this.set("selectAction", action);
  }

  public getType(): string {
    return "Icon";
  }
}
