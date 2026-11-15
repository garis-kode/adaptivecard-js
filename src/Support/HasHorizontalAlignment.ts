import { HorizontalAlignment } from "../Enum/HorizontalAlignment.js";
import type { Node } from "../Node.js";

export class HasHorizontalAlignment<T extends Node> {
  public constructor(private readonly host: T) {}

  /**
   * Controls how the element should be horizontally aligned.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalAlignment(alignment: HorizontalAlignment): T {
    return this.host.setProperty("horizontalAlignment", alignment);
  }
}
