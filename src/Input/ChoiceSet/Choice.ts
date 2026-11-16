import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";

/**
 * A choice as used by the Input.ChoiceSet input.
 */
export class Choice extends Node implements HasKey {
  public constructor(title: string, value: string) {
    super();
    this.title(title);
    this.value(value);
  }

  public static make(title: string, value: string): Choice {
    return new Choice(title, value);
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
   * The text to display for the choice.
   */
  public title(title: string): this {
    return this.set("title", title);
  }

  /**
   * The value associated with the choice, as sent to the Bot when an `Action.Submit`
   * or `Action.Execute` is invoked.
   */
  public value(value: string): this {
    return this.set("value", value);
  }

  public getType(): string | null {
    return null;
  }
}
