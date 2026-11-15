import { RatingColor } from "../Enum/RatingColor.js";
import { RatingSize } from "../Enum/RatingSize.js";
import { AbstractInput } from "./AbstractInput.js";

/**
 * An input to allow the user to rate something using stars.
 */
export class RatingInput extends AbstractInput {
  public constructor(id: string, label: string | null = null) {
    super(id);
    if (label !== null) {
      this.label(label);
    }
  }

  public static make(id: string, label: string | null = null): RatingInput {
    return new RatingInput(id, label);
  }

  /**
   * The default value of the input.
   */
  public value(value: number): this {
    return this.set("value", value);
  }

  /**
   * The number of stars to display.
   */
  public max(max: number): this {
    return this.set("max", max);
  }

  /**
   * The size of the stars.
   * Valid values: "Medium", "Large".
   */
  public size(size: RatingSize): this {
    return this.set("size", size);
  }

  /**
   * The color of the stars.
   * Valid values: "Neutral", "Marigold".
   */
  public color(color: RatingColor): this {
    return this.set("color", color);
  }

  /**
   * Controls if the user can select half stars.
   */
  public allowHalfSteps(allow: boolean = true): this {
    return this.set("allowHalfSteps", allow);
  }

  public getType(): string {
    return "Input.Rating";
  }
}
