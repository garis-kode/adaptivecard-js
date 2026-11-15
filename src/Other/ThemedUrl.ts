import { Theme } from "../Enum/Theme.js";
import { Node } from "../Node.js";
import { HasKey } from "../Support/HasKey.js";

/**
 * Defines a theme-specific URL.
 */
export class ThemedUrl extends Node {
  private readonly hasKey = new HasKey(this);

  public constructor(theme: Theme | null = null, url: string | null = null) {
    super();
    if (theme !== null) {
      this.theme(theme);
    }
    if (url !== null) {
      this.url(url);
    }
  }

  public static make(
    theme: Theme | null = null,
    url: string | null = null,
  ): ThemedUrl {
    return new ThemedUrl(theme, url);
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
   * The theme this URL applies to.
   * Valid values: "Light", "Dark".
   */
  public theme(theme: Theme): this {
    return this.set("theme", theme);
  }

  /**
   * The URL to use for the associated theme.
   */
  public url(url: string): this {
    return this.set("url", url);
  }

  public getType(): string | null {
    return null;
  }
}
