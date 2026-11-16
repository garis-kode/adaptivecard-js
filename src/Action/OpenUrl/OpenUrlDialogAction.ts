import { DialogSize } from "../../Enum/DialogSize.js";
import type { HasMenuActions } from "../../Support/HasMenuActions.js";
import { AbstractAction } from "../AbstractAction.js";

/**
 * Opens a task module in a modal dialog hosting the content at a provided URL.
 */
export class OpenUrlDialogAction
  extends AbstractAction
  implements HasMenuActions
{
  public constructor(
    dialogTitle: string,
    dialogHeight: DialogSize | string,
    url: string,
    title: string | null = null,
  ) {
    super();
    this.dialogTitle(dialogTitle);
    this.dialogHeight(dialogHeight);
    this.url(url);

    if (title !== null) {
      this.title(title);
    }
  }

  public static make(
    dialogTitle: string,
    dialogHeight: DialogSize | string,
    url: string,
    title: string | null = null,
  ): OpenUrlDialogAction {
    return new OpenUrlDialogAction(dialogTitle, dialogHeight, url, title);
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

  /**
   * The title of the dialog to be displayed in the dialog header.
   */
  public dialogTitle(dialogTitle: string): this {
    return this.set("dialogTitle", dialogTitle);
  }

  /**
   * The width of the dialog. To define width as a number of pixels, use the `<number>px` format.
   * Valid values: "small", "medium", "large", "<number>px".
   */
  public dialogWidth(dialogWidth: DialogSize | string): this {
    return this.set("dialogWidth", dialogWidth);
  }

  /**
   * The height of the dialog. To define height as a number of pixels, use the `<number>px` format.
   * Valid values: "small", "medium", "large", "<number>px".
   */
  public dialogHeight(dialogHeight: DialogSize | string): this {
    return this.set("dialogHeight", dialogHeight);
  }

  public getType(): string {
    return "Action.OpenUrlDialog";
  }
}
