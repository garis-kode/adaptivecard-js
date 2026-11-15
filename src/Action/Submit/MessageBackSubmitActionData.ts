import { Node } from '../../Node.ts';
import { HasKey } from '../../Support/HasKey.ts';
import type { TeamsSubmitActionDataInterface } from './TeamsSubmitActionDataInterface.ts';

/**
 * Represents Teams-specific data in an Action.Submit to send a message back to the Bot.
 */
export class MessageBackSubmitActionData extends Node implements TeamsSubmitActionDataInterface {
    private readonly hasKey = new HasKey(this);

    public constructor(
        text: string | null = null,
        value: unknown = null,
        displayText: string | null = null,
    ) {
        super();
        if (text !== null) {
            this.text(text);
        }

        if (value !== null) {
            this.value(value);
        }

        if (displayText !== null) {
            this.displayText(displayText);
        }
    }

    public static make(
        text: string | null = null,
        value: unknown = null,
        displayText: string | null = null,
    ): MessageBackSubmitActionData {
        return new MessageBackSubmitActionData(text, value, displayText);
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
     * The text that will be sent to the Bot.
     */
    public text(text: string): this {
        return this.set('text', text);
    }

    /**
     * Optional additional value that will be sent to the Bot. For instance, `value`
     * can encode specific context for the action, such as unique identifiers or a JSON object.
     */
    public value(value: unknown): this {
        return this.set('value', value);
    }

    /**
     * The optional text that will be displayed as a new message in the conversation,
     * as if the end-user sent it. `displayText` is not sent to the Bot.
     */
    public displayText(displayText: string): this {
        return this.set('displayText', displayText);
    }

    public getType(): string {
        return 'messageBack';
    }
}
