import { Node } from "../Node.js";
import type { HasKey } from "../Support/HasKey.js";
import type { MentionedEntity } from "./MentionedEntity.js";

/**
 * Represents a mention to a person.
 */
export class Mention extends Node implements HasKey {
  public constructor(text: string, mentioned: MentionedEntity) {
    super();
    this.text(text);
    this.mentioned(mentioned);
  }

  public static make(text: string, mentioned: MentionedEntity): Mention {
    return new Mention(text, mentioned);
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
   * The text that will be substituted with the mention.
   */
  public text(text: string): this {
    return this.set("text", text);
  }

  /**
   * Defines the entity being mentioned.
   * Valid values: "MentionedEntity".
   */
  public mentioned(mentioned: MentionedEntity): this {
    return this.set("mentioned", mentioned);
  }

  public getType(): string {
    return "mention";
  }
}
