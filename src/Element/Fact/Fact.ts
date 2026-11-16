import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";

/**
 * A fact in a FactSet element.
 */
export class Fact extends Node implements HasKey {
  constructor(title: string, value: string) {
    super();
    this.title(title);
    this.value(value);
  }

  public static make(title: string, value: string): Fact {
    return new Fact(title, value);
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
   * The fact's title.
   */
  public title(title: string): this {
    return this.set("title", title);
  }

  /**
   * The fact's value.
   */
  public value(value: string): this {
    return this.set("value", value);
  }

  public getType(): string | null {
    return null;
  }
}
