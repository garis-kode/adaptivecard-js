import type { HasMenuActions } from "../../Support/HasMenuActions.js";
import { AbstractAction } from "../AbstractAction.js";

/**
 * Opens the provided URL in either a separate browser tab or within the host application.
 */
export class OpenUrlAction extends AbstractAction implements HasMenuActions {
  public constructor(url: string, title: string | null = null) {
    super();
    this.url(url);

    if (title !== null) {
      this.title(title);
    }
  }

  public static make(url: string, title: string | null = null): OpenUrlAction {
    return new OpenUrlAction(url, title);
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
   * The URL to open.
   */
  public url(url: string): this {
    return this.set("url", url);
  }

  public getType(): string {
    return "Action.OpenUrl";
  }
}
