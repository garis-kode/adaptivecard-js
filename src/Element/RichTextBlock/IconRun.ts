import { AbstractAction } from '../../Action/AbstractAction.ts';
import { Colors } from '../../Enum/Colors.ts';
import { IconStyle } from '../../Enum/IconStyle.ts';
import { TextSize } from '../../Enum/TextSize.ts';
import { AbstractInlineElement } from '../AbstractInlineElement.ts';

/**
 * An inline icon inside a RichTextBlock element.
 */
export class IconRun extends AbstractInlineElement {
  constructor(name: string) {
    super();
    this.name(name);
  }

  public static make(name: string): IconRun {
    return new IconRun(name);
  }

  /**
   * The name of the inline icon to display.
   */
  public name(name: string): this {
    return this.set('name', name);
  }

  /**
   * The color of the inline icon.
   * Valid values: "Default", "Dark", "Light", "Accent", "Good", "Warning", "Attention".
   */
  public color(color: Colors): this {
    return this.set('color', color);
  }

  /**
   * The size of the inline icon.
   * Valid values: "Small", "Default", "Medium", "Large", "ExtraLarge".
   */
  public size(size: TextSize): this {
    return this.set('size', size);
  }

  /**
   * The style of the inline icon.
   * Valid values: "Regular", "Filled".
   */
  public style(style: IconStyle): this {
    return this.set('style', style);
  }

  /**
   * An Action that will be invoked when the inline icon is tapped or clicked.
   * Action.ShowCard is not supported.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.Popover", "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
   */
  public selectAction(action: AbstractAction): this {
    return this.set('selectAction', action);
  }

  public getType(): string {
    return 'IconRun';
  }
}
