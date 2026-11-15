import { Node } from "../../Node.js";
import { HasKey } from "../../Support/HasKey.js";

/**
 * Represents a set of Teams-specific properties on an image.
 */
export class TeamsImageProperties extends Node {
  private readonly hasKey = new HasKey(this);

  constructor(allowExpand: boolean | null = null) {
    super();
    if (allowExpand !== null) {
      this.allowExpand(allowExpand);
    }
  }

  public static make(allowExpand: boolean | null = null): TeamsImageProperties {
    return new TeamsImageProperties(allowExpand);
  }

  /**
   * Key that identifies the element in the list of items.
   */
  public key(key: string): this {
    return this.hasKey.key(key);
  }

  /**
   * Controls if the image is expandable in Teams. This property is equivalent to the
   * `Image.allowExpand` property.
   */
  public allowExpand(allow = true): this {
    return this.set("allowExpand", allow);
  }

  public getType(): string | null {
    return null;
  }
}
