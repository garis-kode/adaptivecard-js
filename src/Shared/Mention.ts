import { Node } from '../Node.ts';
import { HasKey } from '../Support/HasKey.ts';
import type { MentionedEntity } from './MentionedEntity.ts';

/**
 * Represents a mention to a person.
 */
export class Mention extends Node {
    private readonly hasKey = new HasKey(this);

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
        return this.hasKey.key(key);
    }

    /**
     * The text that will be substituted with the mention.
     */
    public text(text: string): this {
        return this.set('text', text);
    }

    /**
     * Defines the entity being mentioned.
     * Valid values: "MentionedEntity".
     */
    public mentioned(mentioned: MentionedEntity): this {
        return this.set('mentioned', mentioned);
    }

    public getType(): string {
        return 'mention';
    }
}
