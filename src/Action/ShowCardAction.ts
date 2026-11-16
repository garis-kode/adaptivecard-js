import type { AdaptiveCard } from "../AdaptiveCard.js";
import type { HasMenuActions } from "../Support/HasMenuActions.js";
import { AbstractAction } from "./AbstractAction.js";

/**
 * Expands or collapses an embedded card within the main card.
 */
export class ShowCardAction extends AbstractAction implements HasMenuActions {
  public constructor(card: AdaptiveCard, title: string | null = null) {
    super();
    this.card(card);

    if (title !== null) {
      this.title(title);
    }
  }

  public static make(
    card: AdaptiveCard,
    title: string | null = null,
  ): ShowCardAction {
    return new ShowCardAction(card, title);
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
   * The card that should be displayed when the action is executed.
   * Valid values: "AdaptiveCard".
   */
  public card(card: AdaptiveCard): this {
    return this.set("card", card);
  }

  public getType(): string {
    return "Action.ShowCard";
  }
}
