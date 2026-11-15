import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { Spacing } from "../../Enum/Spacing.js";
import { HasHeight } from "../../Support/HasHeight.js";
import { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";
import { AbstractInlineElement } from "../AbstractInlineElement.js";

/**
 * A rich text block that displays formatted text.
 */
export class RichTextBlock extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

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
