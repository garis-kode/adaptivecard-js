import { Height } from "../Enum/Height.js";
import type { Node } from "../Node.js";

export class HasHeight<T extends Node> {
  public constructor(private readonly host: T) {}

  /**
   * The height of the element. When set to `stretch`, the element will use
   * the remaining vertical space in its container.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): T {
    return this.host.setProperty("height", height);
  }
}
