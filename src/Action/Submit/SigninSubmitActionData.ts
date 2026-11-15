import { Node } from '../../Node.ts';
import { HasKey } from '../../Support/HasKey.ts';
import type { TeamsSubmitActionDataInterface } from './TeamsSubmitActionDataInterface.ts';

/**
 * Represents Teams-specific data in an Action.Submit to sign in a user.
 */
export class SigninSubmitActionData extends Node implements TeamsSubmitActionDataInterface {
    private readonly hasKey = new HasKey(this);

    public constructor(value: string | null = null) {
        super();
        if (value !== null) {
            this.value(value);
        }
    }

    public static make(value: string | null = null): SigninSubmitActionData {
        return new SigninSubmitActionData(value);
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
     * The URL to redirect the end-user for signing in.
     */
    public value(value: string): this {
        return this.set('value', value);
    }

    public getType(): string {
        return 'signin';
    }
}
