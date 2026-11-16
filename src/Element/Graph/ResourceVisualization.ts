import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";

/**
 * Represents a visualization of a resource.
 */
export class ResourceVisualization extends Node implements HasKey {
  public static make(): ResourceVisualization {
    return new ResourceVisualization();
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
   * The media associated with the resource.
   */
  public media(media: string): this {
    return this.set("media", media);
  }

  public getType(): string | null {
    return null;
  }
}
