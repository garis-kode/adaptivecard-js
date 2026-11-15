import { AbstractInput } from "./AbstractInput.js";

/**
 * An input to allow the user to select between on/off states.
 */
export class ToggleInput extends AbstractInput {
  public constructor(id: string, title: string | null = null) {
    super(id);

    if (title !== null) {
      this.title(title);
    }
  }

  public static make(id: string, title: string | null = null): ToggleInput {
    return new ToggleInput(id, title);
  }

  /**
   * The title (caption) to display next to the toggle.
   */
  public title(title: string): this {
    return this.set("title", title);
  }

  /**
   * Controls whether the title is visually displayed. When set to false, the title is
   * hidden from view but remains accessible to screen readers for accessibility purposes.
   */
  public showTitle(show: boolean = true): this {
    return this.set("showTitle", show);
  }

  /**
   * The default value of the input.
   */
  public value(value: string): this {
    return this.set("value", value);
  }

  /**
   * The value to send to the Bot when the toggle is on.
   */
  public valueOn(valueOn: string): this {
    return this.set("valueOn", valueOn);
  }

  /**
   * The value to send to the Bot when the toggle is off.
   */
  public valueOff(valueOff: string): this {
    return this.set("valueOff", valueOff);
  }

  /**
   * Controls if the title should wrap.
   */
  public wrap(wrap: boolean = true): this {
    return this.set("wrap", wrap);
  }

  public getType(): string {
    return "Input.Toggle";
  }
}
