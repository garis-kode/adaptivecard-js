import { Node } from '../Node.ts';
import { HasKey } from '../Support/HasKey.ts';
import type { StringResource } from './StringResource.ts';

/**
 * The resources that can be used in the body of the card.
 */
export class Resources extends Node {
    private readonly hasKey = new HasKey(this);

    public static make(): Resources {
        return new Resources();
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
     * Add a replacement string value.
     */
    public addString(id: string, stringResource: StringResource): this {
        const strings = (this._properties['strings'] as Record<string, StringResource> | undefined) ?? {};
        strings[id] = stringResource;
        this._properties['strings'] = strings;

        return this;
    }

    /**
     * String resources that can provide translations in multiple languages. String resources
     * make it possible to craft cards that are automatically localized according to the
     * language settings of the application that displays the card.
     * Valid values: "StringResource".
     */
    public strings(strings: Record<string, StringResource>): this {
        return this.set('strings', { ...strings });
    }

    public getType(): string | null {
        return null;
    }
}
