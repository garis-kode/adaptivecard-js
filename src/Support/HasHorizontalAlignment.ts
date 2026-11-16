import type { HorizontalAlignment } from "../Enum/HorizontalAlignment.js";

export interface HasHorizontalAlignment {
  /**
   * Controls how the element should be horizontally aligned.
   * Valid values: "Left", "Center", "Right".
   */
  horizontalAlignment(alignment: HorizontalAlignment): this;
}
