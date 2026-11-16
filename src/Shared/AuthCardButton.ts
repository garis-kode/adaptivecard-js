import { Node } from "../Node.js";
import type { HasKey } from "../Support/HasKey.js";

/**
 * Defines a button as displayed when prompting a user to authenticate.
 */
export class AuthCardButton extends Node implements HasKey {
  public constructor(
    type: string = "signin",
    title: string | null = null,
    value: string | null = null,
    image: string | null = null,
  ) {
    super();
    this.type(type);
    if (title !== null) {
      this.title(title);
    }
    if (value !== null) {
      this.value(value);
    }
    if (image !== null) {
      this.image(image);
    }
  }

  public static make(
    type: string = "signin",
    title: string | null = null,
    value: string | null = null,
    image: string | null = null,
  ): AuthCardButton {
    return new AuthCardButton(type, title, value, image);
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
   * Must be `signin`.
   */
  public type(type: string): this {
    return this.set("type", type);
  }

  /**
   * The caption of the button.
   */
  public title(title: string): this {
    return this.set("title", title);
  }

  /**
   * The value associated with the button. The meaning of `value` depends on the
   * button's type.
   */
  public value(value: string): this {
    return this.set("value", value);
  }

  /**
   * A URL to an image to display alongside the button's caption.
   */
  public image(image: string): this {
    return this.set("image", image);
  }

  public getType(): string | null {
    return null;
  }
}
