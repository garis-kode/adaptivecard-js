import { AbstractAction } from '../Action/AbstractAction.ts';
import { Height } from '../Enum/Height.ts';
import { HorizontalAlignment } from '../Enum/HorizontalAlignment.ts';
import { Spacing } from '../Enum/Spacing.ts';
import { HasHeight } from '../Support/HasHeight.ts';
import { HasHorizontalAlignment } from '../Support/HasHorizontalAlignment.ts';
import { HasSpacing } from '../Support/HasSpacing.ts';
import { AbstractBlockElement } from './AbstractBlockElement.ts';

/**
 * Displays a set of action, which can be placed anywhere in the card.
 */
export class ActionSet extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

  public static make(): ActionSet {
    return new ActionSet();
  }

  /**
   * Controls how the element should be vertically sized.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.hasHeight.height(height);
  }

  /**
   * Controls how the element should be horizontally aligned.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalAlignment(alignment: HorizontalAlignment): this {
    return this.hasHorizontalAlignment.horizontalAlignment(alignment);
  }

  /**
   * Controls the amount of space between this element and the preceding one.
   * Valid values: "none", "extraSmall", "small", "default", "medium", "large", "extraLarge", "padding".
   */
  public spacing(spacing: Spacing): this {
    return this.hasSpacing.spacing(spacing);
  }

  /**
   * Add an action to the set.
   */
  public addActions(action: AbstractAction | Iterable<AbstractAction>): this {
    if (!(action instanceof AbstractAction) && Symbol.iterator in Object(action)) {
      for (const item of action) {
        this.push('actions', item);
      }

      return this;
    }

    return this.push('actions', action);
  }

  /**
   * The actions in the set.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.Popover", "Action.ResetInputs", "Action.RunCommands", "Action.ShowCard", "Action.Submit",
   * "Action.ToggleVisibility".
   */
  public actions(actions: Iterable<AbstractAction>): this {
    return this.addActions(actions);
  }

  public getType(): string {
    return 'ActionSet';
  }
}
