import type { Spacing } from "../Enum/Spacing.js";

export interface HasSpacing {
  /**
   * Controls the amount of space between this element and the previous one.
   * No space will be added for the first element in a container.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  spacing(spacing: Spacing): this;
}
