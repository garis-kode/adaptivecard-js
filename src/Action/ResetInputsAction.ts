import type { HasMenuActions } from "../Support/HasMenuActions.js";
import { AbstractAction } from "./AbstractAction.js";

/**
 * Resets the values of the inputs in the card.
 */
export class ResetInputsAction
  extends AbstractAction
  implements HasMenuActions
{
  public constructor(title: string | null = null) {
    super();
    if (title !== null) {
      this.title(title);
    }
  }

  public static make(title: string | null = null): ResetInputsAction {
    return new ResetInputsAction(title);
  }

  /**
   * Add actions to display in the overflow menu of a Split action button.
   */
  public addMenuActions(
    action: AbstractAction | Iterable<AbstractAction>,
  ): this {
    if (
      !(action instanceof AbstractAction) &&
      Symbol.iterator in Object(action)
    ) {
      for (const item of action) {
        this.push("menuActions", item);
      }

      return this;
    }

    return this.push("menuActions", action);
  }

  /**
   * The actions to display in the overflow menu of a Split action button.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
   */
  public menuActions(actions: Iterable<AbstractAction>): this {
    return this.addMenuActions(actions);
  }

  /**
   * Add the Ids of the inputs that should be reset.
   */
  public addTargetInputIds(id: string | Iterable<string>): this {
    if (typeof id !== "string" && Symbol.iterator in Object(id)) {
      for (const item of id) {
        this.push("targetInputIds", item);
      }

      return this;
    }

    return this.push("targetInputIds", id);
  }

  /**
   * The Ids of the inputs that should be reset.
   */
  public targetInputIds(targetInputIds: Iterable<string>): this {
    return this.addTargetInputIds(targetInputIds);
  }

  public getType(): string {
    return "Action.ResetInputs";
  }
}
