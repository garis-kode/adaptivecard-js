import { Node } from '../Node.ts';
import { HasKey } from '../Support/HasKey.ts';

/**
 * Defines information required to enable on-behalf-of single sign-on user authentication.
 */
export class TokenExchangeResource extends Node {
    private readonly hasKey = new HasKey(this);

    public constructor(
        id: string | null = null,
        providerId: string | null = null,
        uri: string | null = null,
    ) {
        super();
        if (id !== null) {
            this.id(id);
        }
        if (providerId !== null) {
            this.providerId(providerId);
        }
        if (uri !== null) {
            this.uri(uri);
        }
    }

    public static make(
        id: string | null = null,
        providerId: string | null = null,
        uri: string | null = null,
    ): TokenExchangeResource {
        return new TokenExchangeResource(id, providerId, uri);
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
     * The unique identified of this token exchange instance.
     */
    public id(id: string): this {
        return this.set('id', id);
    }

    /**
     * An identifier for the identity provider with which to attempt a token exchange.
     */
    public providerId(providerId: string): this {
        return this.set('providerId', providerId);
    }

    /**
     * An application ID or resource identifier with which to exchange a token on behalf
     * of. This property is identity provider- and application-specific.
     */
    public uri(uri: string): this {
        return this.set('uri', uri);
    }

    public getType(): string | null {
        return null;
    }
}
