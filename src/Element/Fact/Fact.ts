import { Node } from "../../Node.js";
import { HasKey } from "../../Support/HasKey.js";

/**
 * A fact in a FactSet element.
 */
export class Fact extends Node {
  private readonly hasKey = new HasKey(this);

  constructor(title: string, value: string) {
    super();
    this.title(title);
    this.value(value);
  }

  public static make(title: string, value: string): Fact {
    return new Fact(title, value);
  }

  /**
   * Key that identifies the element in the list of items.
   */
  public key(key: string): this {
    return this.hasKey.key(key);
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
