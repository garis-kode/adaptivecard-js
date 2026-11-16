import type { Height } from "../Enum/Height.js";

export interface HasHeight {
  /**
   * The height of the element. When set to `stretch`, the element will use
   * the remaining vertical space in its container.
   * Valid values: "auto", "stretch".
   */
  height(height: Height): this;
}
