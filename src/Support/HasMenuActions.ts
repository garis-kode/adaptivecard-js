import type { AbstractAction } from "../Action/AbstractAction.js";

export interface HasMenuActions {
  /**
   * Add actions to display in the overflow menu of a Split action button.
   */
  addMenuActions(action: AbstractAction | Iterable<AbstractAction>): this;

  /**
   * The actions to display in the overflow menu of a Split action button.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
   */
  menuActions(actions: Iterable<AbstractAction>): this;
}
