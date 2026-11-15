import { Spacing } from "../Enum/Spacing.js";
import type { Node } from "../Node.js";

export class HasSpacing<T extends Node> {
  public constructor(private readonly host: T) {}

  /**
   * Controls the amount of space between this element and the previous one.
   * No space will be added for the first element in a container.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  public spacing(spacing: Spacing): T {
    return this.host.setProperty("spacing", spacing);
  }
}
