import { Node } from "../Node.js";
import type { HasKey } from "../Support/HasKey.js";
import type { StringResource } from "./StringResource.js";

/**
 * The resources that can be used in the body of the card.
 */
export class Resources extends Node implements HasKey {
  public static make(): Resources {
    return new Resources();
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
   * Add a replacement string value.
   */
  public addString(id: string, stringResource: StringResource): this {
    const existing = Object.hasOwn(this._properties, "strings")
      ? (this._properties["strings"] as
          Record<string, StringResource> | undefined)
      : undefined;
    const strings: Record<string, unknown> = {};
    if (existing !== undefined) {
      for (const [key, value] of Object.entries(existing)) {
        Node.defineOwnProperty(strings, key, value);
      }
    }
    Node.defineOwnProperty(strings, id, stringResource);

    return this.set("strings", strings);
  }

  /**
   * String resources that can provide translations in multiple languages. String resources
   * make it possible to craft cards that are automatically localized according to the
   * language settings of the application that displays the card.
   * Valid values: "StringResource".
   */
  public strings(strings: Record<string, StringResource>): this {
    const copy: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(strings)) {
      Node.defineOwnProperty(copy, key, value);
    }

    return this.set("strings", copy);
  }

  public getType(): string | null {
    return null;
  }
}
