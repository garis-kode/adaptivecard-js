import { Node } from '../Node.ts';
import { HasKey } from '../Support/HasKey.ts';

/**
 * Represents a list of versioned capabilities a host application must support.
 */
export class HostCapabilities extends Node {
    private readonly hasKey = new HasKey(this);

    public constructor(capabilities: Record<string, string> = {}) {
        super();
        this.with(capabilities);
    }

    public static make(capabilities: Record<string, string> = {}): HostCapabilities {
        return new HostCapabilities(capabilities);
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
     * Set a required capability and its minimum version.
     */
    public capability(name: string, version: string): this {
        return this.set(name, version);
    }

    /**
     * Merge multiple capability version requirements into the object.
     */
    public with(capabilities: Record<string, string>): this {
        for (const [name, version] of Object.entries(capabilities)) {
            this.set(name, version);
        }

        return this;
    }

    public getType(): string | null {
        return null;
    }
}
