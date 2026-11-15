import { Node } from '../../Node.ts';
import { HasKey } from '../../Support/HasKey.ts';
import type { TeamsSubmitActionDataInterface } from './TeamsSubmitActionDataInterface.ts';

/**
 * Represents the data of an Action.Submit or Action.Execute.
 */
export class SubmitActionData extends Node {
    private readonly hasKey = new HasKey(this);

    public constructor(customProperties: Record<string, unknown> = {}) {
        super();
        this.with(customProperties);
    }

    public static make(customProperties: Record<string, unknown> = {}): SubmitActionData {
        return new SubmitActionData(customProperties);
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
     * Defines the optional Teams-specific portion of the action's data.
     * Valid values: "ImBackSubmitActionData", "InvokeSubmitActionData", "MessageBackSubmitActionData", "SigninSubmitActionData", "TaskFetchSubmitActionData".
     */
    public msteams(msteams: TeamsSubmitActionDataInterface, useCamelCaseKey: boolean = false): this {
        if (useCamelCaseKey) {
            return this.set('msTeams', msteams);
        }

        return this.set('msteams', msteams);
    }

    /**
     * Set a custom key-value pair on the data object.
     */
    public custom(key: string, value: unknown): this {
        return this.set(key, value);
    }

    /**
     * Merge multiple custom properties into the data object.
     */
    public with(properties: Record<string, unknown>): this {
        for (const [key, value] of Object.entries(properties)) {
            this.set(key, value);
        }

        return this;
    }

    public getType(): string | null {
        return null;
    }
}
