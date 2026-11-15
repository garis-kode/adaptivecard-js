import { AbstractInlineElement } from '../AbstractInlineElement.ts';

/**
 * A citation inside a RichTextBlock element.
 */
export class CitationRun extends AbstractInlineElement {
  constructor(text: string, referenceIndex: number) {
    super();
    this.text(text);
    this.referenceIndex(referenceIndex);
  }

  public static make(text: string, referenceIndex: number): CitationRun {
    return new CitationRun(text, referenceIndex);
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
   * The index of the reference to be cited. Indexing starts at 1.
   */
  public referenceIndex(referenceIndex: number): this {
    return this.set('referenceIndex', referenceIndex);
  }

  public getType(): string {
    return 'CitationRun';
  }
}
