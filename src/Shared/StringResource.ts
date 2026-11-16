import { Node } from "../Node.js";
import type { HasKey } from "../Support/HasKey.js";

/**
 * Defines the replacement string values.
 */
export class StringResource extends Node implements HasKey {
  public constructor(
    defaultValue: string,
    localizedValues: Record<string, string> = {},
  ) {
    super();
    this.defaultValue(defaultValue);
    if (Object.keys(localizedValues).length > 0) {
      this.localizedValues(localizedValues);
    }
  }

  public static make(
    defaultValue: string,
    localizedValues: Record<string, string> = {},
  ): StringResource {
    return new StringResource(defaultValue, localizedValues);
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
   * The default value of the string, which is used when no matching localized value is found.
   */
  public defaultValue(defaultValue: string): this {
    return this.set("defaultValue", defaultValue);
  }

  /**
   * Localized values of the string, where keys represent the locale (e.g. en-US) in the
   * `<ISO 639-1>(-<ISO 3166-1 alpha-2>)` format. `<ISO 639-1>` is the 2-letter language
   * code and `<ISO 3166-1 alpha-2>` is the optional 2-letter country code.
   */
  public localizedValues(localizedValues: Record<string, string>): this {
    const copy: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(localizedValues)) {
      Node.defineOwnProperty(copy, key, value);
    }

    return this.set("localizedValues", copy);
  }

  /**
   * Add a localized value for a specific locale.
   */
  public addLocalizedValue(locale: string, value: string): this {
    const existing = Object.hasOwn(this._properties, "localizedValues")
      ? (this._properties["localizedValues"] as
          Record<string, string> | undefined)
      : undefined;
    const copy: Record<string, unknown> = {};
    if (existing !== undefined) {
      for (const [k, v] of Object.entries(existing)) {
        Node.defineOwnProperty(copy, k, v);
      }
    }
    Node.defineOwnProperty(copy, locale, value);

    return this.set("localizedValues", copy);
  }

  public getType(): string | null {
    return null;
  }
}
