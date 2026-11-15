import { AbstractInput } from "./AbstractInput.js";

/**
 * An input to allow the user to enter a number.
 */
export class NumberInput extends AbstractInput {
  public constructor(
    id: string,
    label: string | null = null,
    placeholder: string | null = null,
  ) {
    super(id);

    if (label !== null) {
      this.label(label);
    }
    if (placeholder !== null) {
      this.placeholder(placeholder);
    }
  }

  public static make(
    id: string,
    label: string | null = null,
    placeholder: string | null = null,
  ): NumberInput {
    return new NumberInput(id, label, placeholder);
  }

  /**
   * The default value of the input.
   */
  public value(value: number): this {
    return this.set("value", value);
  }

  /**
   * The text to display as a placeholder when the user hasn't entered a value.
   */
  public placeholder(placeholder: string): this {
    return this.set("placeholder", placeholder);
  }

  /**
   * The minimum value that can be entered.
   */
  public min(min: number): this {
    return this.set("min", min);
  }

  /**
   * The maximum value that can be entered.
   */
  public max(max: number): this {
    return this.set("max", max);
  }

  public getType(): string {
    return "Input.Number";
  }
}
