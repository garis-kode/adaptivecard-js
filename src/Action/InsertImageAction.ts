import { InsertPosition } from "../Enum/InsertPosition.js";
import type { HasMenuActions } from "../Support/HasMenuActions.js";
import { AbstractAction } from "./AbstractAction.js";

/**
 * Inserts an image into the host application's canvas.
 */
export class InsertImageAction
  extends AbstractAction
  implements HasMenuActions
{
  public constructor(
    url: string,
    altText: string,
    title: string | null = null,
  ) {
    super();
    this.url(url);
    this.altText(altText);

    if (title !== null) {
      this.title(title);
    }
  }

  public static make(
    url: string,
    altText: string,
    title: string | null = null,
  ): InsertImageAction {
    return new InsertImageAction(url, altText, title);
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
   * The URL of the image to insert.
   */
  public url(url: string): this {
    return this.set("url", url);
  }

  /**
   * The alternate text for the image.
   */
  public altText(altText: string): this {
    return this.set("altText", altText);
  }

  /**
   * The position at which to insert the image.
   * Valid values: "Selection", "Top", "Bottom".
   */
  public insertPosition(insertPosition: InsertPosition): this {
    return this.set("insertPosition", insertPosition);
  }

  public getType(): string {
    return "Action.InsertImage";
  }
}
