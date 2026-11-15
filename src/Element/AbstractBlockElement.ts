import { HasSeparator } from "../Support/HasSeparator.js";
import { AbstractElement } from "./AbstractElement.js";

export abstract class AbstractBlockElement extends AbstractElement {
  private readonly hasSeparator = new HasSeparator(this);

  /**
   * Controls whether a separator line should be displayed above the element
   * to visually separate it from the previous element. No separator will be
   * displayed for the first element in a container, even if this property is
   * set to true.
   */
  public separator(separator: boolean = true): this {
    return this.hasSeparator.separator(separator);
  }
}
