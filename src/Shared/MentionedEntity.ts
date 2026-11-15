import { MentionType } from "../Enum/MentionType.js";
import { Node } from "../Node.js";
import { HasKey } from "../Support/HasKey.js";

/**
 * Represents a mentioned person or tag.
 */
export class MentionedEntity extends Node {
  private readonly hasKey = new HasKey(this);

  public constructor(
    id: string,
    name: string,
    mentionType: MentionType = MentionType.Person,
  ) {
    super();
    this.id(id);
    this.name(name);
    this.mentionType(mentionType);
  }

  public static make(
    id: string,
    name: string,
    mentionType: MentionType = MentionType.Person,
  ): MentionedEntity {
    return new MentionedEntity(id, name, mentionType);
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
   * The Id of a person (typically a Microsoft Entra user Id) or tag.
   */
  public id(id: string): this {
    return this.set("id", id);
  }

  /**
   * The name of the mentioned entity.
   */
  public name(name: string): this {
    return this.set("name", name);
  }

  /**
   * The type of the mentioned entity.
   * Valid values: "Person", "Tag".
   */
  public mentionType(mentionType: MentionType): this {
    return this.set("mentionType", mentionType);
  }

  public getType(): string | null {
    return null;
  }
}
