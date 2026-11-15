import type { Node } from '../Node.ts';

export class HasKey<T extends Node> {
    public constructor(private readonly host: T) {}

    /**
     * Defines an optional key for the object. Keys are seldom needed, but in
     * some scenarios, specifying keys can help maintain visual state in the
     * host application.
     */
    public key(key: string): T {
        return this.host.setProperty('key', key);
    }
}
