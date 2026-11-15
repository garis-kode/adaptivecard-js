import { AbstractAction } from "../Action/AbstractAction.js";
import type { Node } from "../Node.js";

export class HasMenuActions<T extends Node> {
  public constructor(private readonly host: T) {}

  /**
   * Add actions to display in the overflow menu of a Split action button.
   */
  public addMenuActions(action: AbstractAction | Iterable<AbstractAction>): T {
    if (
      !(action instanceof AbstractAction) &&
      Symbol.iterator in Object(action)
    ) {
      for (const item of action) {
        this.host.pushProperty("menuActions", item);
      }

      return this.host;
    }

    return this.host.pushProperty("menuActions", action);
  }

  /**
   * The actions to display in the overflow menu of a Split action button.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
   */
  public menuActions(actions: Iterable<AbstractAction>): T {
    return this.addMenuActions(actions);
  }
}
