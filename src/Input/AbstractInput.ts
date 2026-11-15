import type { AbstractAction } from "../Action/AbstractAction.js";
import { AbstractBlockElement } from "../Element/AbstractBlockElement.js";
import { Height } from "../Enum/Height.js";
import { Spacing } from "../Enum/Spacing.js";
import { HasHeight } from "../Support/HasHeight.js";
import { HasSpacing } from "../Support/HasSpacing.js";

export abstract class AbstractInput extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasSpacing = new HasSpacing(this);

  public constructor(id: string) {
    super();
    this.id(id);
  }

  /**
   * The height of the element. When set to `stretch`, the element will use
   * the remaining vertical space in its container.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.hasHeight.height(height);
  }

  /**
   * Controls the amount of space between this element and the previous one.
   * No space will be added for the first element in a container.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  public spacing(spacing: Spacing): this {
    return this.hasSpacing.spacing(spacing);
  }

  /**
   * The label of the input. A label should always be provided to ensure the best
   * user experience especially for users of assistive technology.
   */
  public label(label: string): this {
    return this.set("label", label);
  }

  /**
   * Controls whether the input is required.
   */
  public isRequired(required: boolean = true): this {
    return this.set("isRequired", required);
  }

  /**
   * The error message to display when the input fails validation.
   */
  public errorMessage(message: string): this {
    return this.set("errorMessage", message);
  }

  /**
   * Controls whether the input's label is visually rendered. When set to false,
   * the label is still applied as the input's accessible name to ensure the best
   * user experience especially for users of assistive technology.
   */
  public showLabel(show: boolean = true): this {
    return this.set("showLabel", show);
  }

  /**
   * An `Action.ResetInputs` action that will be executed when the value of the input changes.
   * Valid values: "Action.OpenUrlDialog", "Action.Popover", "Action.ResetInputs", "Action.RunCommands".
   */
  public valueChangedAction(action: AbstractAction): this {
    return this.set("valueChangedAction", action);
  }
}
