import { AbstractAction } from '../../Action/AbstractAction.ts';
import { Colors } from '../../Enum/Colors.ts';
import { FontType } from '../../Enum/FontType.ts';
import { TextSize } from '../../Enum/TextSize.ts';
import { TextWeight } from '../../Enum/TextWeight.ts';
import { AbstractInlineElement } from '../AbstractInlineElement.ts';

/**
 * A block of text inside a RichTextBlock element.
 */
export class TextRun extends AbstractInlineElement {
  constructor(text: string) {
    super();
    this.text(text);
  }

  public static make(text: string): TextRun {
    return new TextRun(text);
  }

  /**
   * The text to display. A subset of markdown is supported.
   */
  public text(text: string): this {
    return this.set('text', text);
  }

  /**
   * Defines an expression whose evaluated value will be used to update the `text` property of the
   * TextBlock at runtime.
   */
  public textDynamic(expression: string): this {
    return this.set('text.dynamic', expression);
  }

  /**
   * The color of the text.
   * Valid values: "Default", "Dark", "Light", "Accent", "Good", "Warning", "Attention".
   */
  public color(color: Colors): this {
    return this.set('color', color);
  }

  /**
   * The type of font to use for rendering.
   * Valid values: "Default", "Monospace".
   */
  public fontType(fontType: FontType): this {
    return this.set('fontType', fontType);
  }

  /**
   * The size of the text.
   * Valid values: "Small", "Default", "Medium", "Large", "ExtraLarge".
   */
  public size(size: TextSize): this {
    return this.set('size', size);
  }

  /**
   * The weight of the text.
   * Valid values: "Lighter", "Default", "Bolder".
   */
  public weight(weight: TextWeight): this {
    return this.set('weight', weight);
  }

  /**
   * Controls whether the text should be renderer using a subtler variant of the select color.
   */
  public isSubtle(subtle = true): this {
    return this.set('isSubtle', subtle);
  }

  /**
   * Controls if the text should be italicized.
   */
  public italic(italic = true): this {
    return this.set('italic', italic);
  }

  /**
   * Controls if the text should be struck through.
   */
  public strikethrough(strikethrough = true): this {
    return this.set('strikethrough', strikethrough);
  }

  /**
   * Controls if the text should be highlighted.
   */
  public highlight(highlight = true): this {
    return this.set('highlight', highlight);
  }

  /**
   * Controls if the text should be underlined.
   */
  public underline(underline = true): this {
    return this.set('underline', underline);
  }

  /**
   * An Action that will be invoked when the text is tapped or clicked.
   * Action.ShowCard is not supported.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.Popover", "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
   */
  public selectAction(action: AbstractAction): this {
    return this.set('selectAction', action);
  }

  public getType(): string {
    return 'TextRun';
  }
}
