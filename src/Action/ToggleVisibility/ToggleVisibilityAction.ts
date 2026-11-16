import type { HasMenuActions } from "../../Support/HasMenuActions.js";
import { AbstractAction } from "../AbstractAction.js";
import { TargetElement } from "./TargetElement.js";

/**
 * Toggles the visibility of a set of elements. `Action.ToggleVisibility` is useful for creating
 * "Show more" type UI patterns.
 */
export class ToggleVisibilityAction
  extends AbstractAction
  implements HasMenuActions
{
  public constructor(title: string | null = null) {
    super();
    if (title !== null) {
      this.title(title);
    }
  }

  public static make(title: string | null = null): ToggleVisibilityAction {
    return new ToggleVisibilityAction(title);
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
   * Toggle a target element by ID. Pass isVisible to force a specific state;
   * omit it to flip the current state.
   */
  public target(elementId: string, isVisible: boolean | null = null): this {
    return this.addTargetElements(new TargetElement(elementId, isVisible));
  }

  /**
   * Add the Ids of the elements to toggle the visibility of.
   */
  public addTargetElements(
    target: TargetElement | Iterable<TargetElement>,
  ): this {
    if (
      !(target instanceof TargetElement) &&
      Symbol.iterator in Object(target)
    ) {
      for (const item of target) {
        this.push("targetElements", item);
      }

      return this;
    }

    return this.push("targetElements", target);
  }

  /**
   * The Ids of the elements to toggle the visibility of.
   * Valid values: "TargetElement".
   */
  public targetElements(targets: Iterable<TargetElement>): this {
    return this.addTargetElements(targets);
  }

  /**
   * Controls whether the aria-controls attribute should be suppressed.
   */
  public suppressAriaControls(suppress: boolean = true): this {
    return this.set("suppressAriaControls", suppress);
  }

  public getType(): string {
    return "Action.ToggleVisibility";
  }
}
