import { AbstractInput } from "./AbstractInput.js";

/**
 * An input to allow the user to select a time.
 */
export class TimeInput extends AbstractInput {
  public constructor(id: string, label: string | null = null) {
    super(id);

    if (label !== null) {
      this.label(label);
    }
  }

  public static make(id: string, label: string | null = null): TimeInput {
    return new TimeInput(id, label);
  }

  /**
   * The default value of the input, in the `HH:MM` format.
   */
  public value(value: string): this {
    return this.set("value", value);
  }

  /**
   * The text to display as a placeholder when the user hasn't entered a value.
   */
  public placeholder(placeholder: string): this {
    return this.set("placeholder", placeholder);
  }

  /**
   * The minimum time that can be selected, in the `HH:MM` format.
   */
  public min(min: string): this {
    return this.set("min", min);
  }

  /**
   * The maximum time that can be selected, in the `HH:MM` format.
   */
  public max(max: string): this {
    return this.set("max", max);
  }

  public getType(): string {
    return "Input.Time";
  }
}
