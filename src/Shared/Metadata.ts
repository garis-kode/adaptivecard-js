import { Node } from "../Node.js";
import { HasKey } from "../Support/HasKey.js";

/**
 * Card-level metadata.
 */
export class Metadata extends Node {
  private readonly hasKey = new HasKey(this);

  public constructor(webUrl: string | null = null) {
    super();
    if (webUrl !== null) {
      this.webUrl(webUrl);
    }
  }

  public static make(webUrl: string | null = null): Metadata {
    return new Metadata(webUrl);
  }

  /**
   * Defines an optional key for the object. Keys are seldom needed, but in
   * some scenarios, specifying keys can help maintain visual state in the
   * host application.
   */
  public key(key: string): this {
    return this.hasKey.key(key);
  }

  /**
   * The URL the card originates from. When `webUrl` is set, the card is dubbed an
   * Adaptive Card-based Loop Component and, when pasted in Teams or other Loop
   * Component-capable host applications, the URL will unfurl to the same exact card.
   */
  public webUrl(webUrl: string): this {
    return this.set("webUrl", webUrl);
  }

  public getType(): string | null {
    return null;
  }
}
