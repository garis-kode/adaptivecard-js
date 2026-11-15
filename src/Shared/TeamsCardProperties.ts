import { Node } from "../Node.js";
import { HasKey } from "../Support/HasKey.js";
import { Mention } from "./Mention.js";

/**
 * Represents a set of Teams-specific properties on a card.
 */
export class TeamsCardProperties extends Node {
  private readonly hasKey = new HasKey(this);

  public static make(): TeamsCardProperties {
    return new TeamsCardProperties();
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
   * Add the Teams-specific entities associated with the card.
   */
  public addEntities(mention: Mention | Iterable<Mention>): this {
    if (!(mention instanceof Mention) && Symbol.iterator in Object(mention)) {
      for (const item of mention) {
        this.push("entities", item);
      }

      return this;
    }

    return this.push("entities", mention);
  }

  /**
   * The Teams-specific entities associated with the card.
   * Valid values: "mention".
   */
  public entities(entities: Iterable<Mention>): this {
    return this.addEntities(entities);
  }

  /**
   * Controls the width of the card in a Teams chat. Note that setting width to `"full"`
   * will not actually stretch the card to the "full width" of the chat pane. It will only
   * make the card wider than when the width property isn't set.
   * Valid values: "full".
   */
  public width(width: "full" | string): this {
    return this.set("width", width);
  }

  public getType(): string | null {
    return null;
  }
}
