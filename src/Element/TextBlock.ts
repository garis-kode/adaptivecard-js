import { Colors } from '../Enum/Colors.ts';
import { FontType } from '../Enum/FontType.ts';
import { Height } from '../Enum/Height.ts';
import { HorizontalAlignment } from '../Enum/HorizontalAlignment.ts';
import { Spacing } from '../Enum/Spacing.ts';
import { TextBlockStyle } from '../Enum/TextBlockStyle.ts';
import { TextSize } from '../Enum/TextSize.ts';
import { TextWeight } from '../Enum/TextWeight.ts';
import { HasHeight } from '../Support/HasHeight.ts';
import { HasHorizontalAlignment } from '../Support/HasHorizontalAlignment.ts';
import { HasSpacing } from '../Support/HasSpacing.ts';
import { AbstractBlockElement } from './AbstractBlockElement.ts';

/**
 * A block of text, optionally formatted using Markdown.
 */
export class TextBlock extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

  constructor(text: string | null = null, wrap: boolean | null = null) {
    super();
    if (text !== null) {
      this.text(text);
    }
    if (wrap !== null) {
      this.wrap(wrap);
    }
  }

  public static make(text: string | null = null, wrap: boolean | null = null): TextBlock {
    return new TextBlock(text, wrap);
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
   * The text to display. A subset of markdown is supported.
   */
  public text(text: string): this {
    return this.set('text', text);
  }

  /**
   * Defines an expression whose evaluated value will be used to update the
   * `text` property of the TextBlock at runtime.
   */
  public textDynamic(expression: string): this {
    return this.set('text.dynamic', expression);
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
   * Controls whether the text should be renderer using a subtler variant of the select color.
   */
  public isSubtle(subtle = true): this {
    return this.set('isSubtle', subtle);
  }

  /**
   * The maximum number of lines to display.
   */
  public maxLines(maxLines: number): this {
    return this.set('maxLines', maxLines);
  }

  /**
   * Controls if the text should wrap.
   */
  public wrap(wrap = true): this {
    return this.set('wrap', wrap);
  }

  /**
   * The style of the text.
   * Valid values: "default", "columnHeader", "heading".
   */
  public style(style: TextBlockStyle): this {
    return this.set('style', style);
  }

  /**
   * The Id of the input the TextBlock should act as the label of.
   */
  public labelFor(inputId: string): this {
    return this.set('labelFor', inputId);
  }

  public getType(): string {
    return 'TextBlock';
  }
}
