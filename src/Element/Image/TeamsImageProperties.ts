import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";

/**
 * Represents a set of Teams-specific properties on an image.
 */
export class TeamsImageProperties extends Node implements HasKey {
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
   * Defines an optional key for the object. Keys are seldom needed, but in
   * some scenarios, specifying keys can help maintain visual state in the
   * host application.
   */
  public key(key: string): this {
    return this.set("key", key);
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
