import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { Spacing } from "../../Enum/Spacing.js";
import type { HasHeight } from "../../Support/HasHeight.js";
import type { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import type { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";
import { AbstractInlineElement } from "../AbstractInlineElement.js";

/**
 * A rich text block that displays formatted text.
 */
export class RichTextBlock
  extends AbstractBlockElement
  implements HasHeight, HasHorizontalAlignment, HasSpacing
{
  constructor(
    ...inlines: Array<
      AbstractInlineElement | Iterable<AbstractInlineElement> | null
    >
  ) {
    super();
    for (const inline of inlines) {
      if (inline !== null) {
        this.addInlines(inline);
      }
    }
  }

  public static make(
    ...inlines: Array<
      AbstractInlineElement | Iterable<AbstractInlineElement> | null
    >
  ): RichTextBlock {
    return new RichTextBlock(...inlines);
  }

  /**
   * The height of the element. When set to `stretch`, the element will use
   * the remaining vertical space in its container.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.set("height", height);
  }

  /**
   * Controls how the element should be horizontally aligned.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalAlignment(alignment: HorizontalAlignment): this {
    return this.set("horizontalAlignment", alignment);
  }

  /**
   * Controls the amount of space between this element and the previous one.
   * No space will be added for the first element in a container.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  public spacing(spacing: Spacing): this {
    return this.set("spacing", spacing);
  }

  /**
   * Add inlines making up the rich text block.
   */
  public addInlines(
    inline: AbstractInlineElement | Iterable<AbstractInlineElement>,
  ): this {
    if (
      !(inline instanceof AbstractInlineElement) &&
      Symbol.iterator in Object(inline)
    ) {
      for (const item of inline) {
        this.push("inlines", item);
      }

      return this;
    }

    return this.push("inlines", inline);
  }

  /**
   * The inlines making up the rich text block.
   * Valid values: "TextRun", "IconRun", "ImageRun", "CitationRun".
   */
  public inlines(
    ...inlines: Array<
      AbstractInlineElement | Iterable<AbstractInlineElement> | null
    >
  ): this {
    for (const inline of inlines) {
      if (inline !== null) {
        this.addInlines(inline);
      }
    }

    return this;
  }

  /**
   * The Id of the input the RichTextBlock should act as the label of.
   */
  public labelFor(inputId: string): this {
    return this.set("labelFor", inputId);
  }

  public getType(): string {
    return "RichTextBlock";
  }
}
