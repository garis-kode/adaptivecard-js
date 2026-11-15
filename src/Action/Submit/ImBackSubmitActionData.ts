import { Node } from '../../Node.ts';
import { HasKey } from '../../Support/HasKey.ts';
import type { TeamsSubmitActionDataInterface } from './TeamsSubmitActionDataInterface.ts';

/**
 * Represents Teams-specific data in an Action.Submit to send an Instant Message back to the Bot.
 */
export class ImBackSubmitActionData extends Node implements TeamsSubmitActionDataInterface {
    private readonly hasKey = new HasKey(this);

    public constructor(value: string | null = null) {
        super();
        if (value !== null) {
            this.value(value);
        }
    }

    public static make(value: string | null = null): ImBackSubmitActionData {
        return new ImBackSubmitActionData(value);
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
     * The value that will be sent to the Bot.
     */
    public value(value: string): this {
        return this.set('value', value);
    }

    public getType(): string {
        return 'imBack';
    }
}
