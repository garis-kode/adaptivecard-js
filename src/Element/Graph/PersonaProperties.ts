import { PersonaIconStyle } from '../../Enum/PersonaIconStyle.ts';
import { PersonaStyle } from '../../Enum/PersonaStyle.ts';
import { Node } from '../../Node.ts';
import { HasKey } from '../../Support/HasKey.ts';

/**
 * Represents the properties of a Persona component.
 */
export class PersonaProperties extends Node {
    private readonly hasKey = new HasKey(this);

    public static make(): PersonaProperties {
        return new PersonaProperties();
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
     * The display name of the persona.
     */
    public displayName(displayName: string): this {
        return this.set('displayName', displayName);
    }

    /**
     * Defines the style of the icon for the persona.
     * Valid values: "profilePicture", "contactCard", "none".
     */
    public iconStyle(iconStyle: PersonaIconStyle): this {
        return this.set('iconStyle', iconStyle);
    }

    /**
     * The Id of the persona.
     */
    public id(id: string): this {
        return this.set('id', id);
    }

    /**
     * Defines how the persona should be displayed.
     * Valid values: "iconAndName", "iconOnly", "nameOnly".
     */
    public style(style: PersonaStyle): this {
        return this.set('style', style);
    }

    /**
     * The UPN of the persona.
     */
    public userPrincipalName(userPrincipalName: string): this {
        return this.set('userPrincipalName', userPrincipalName);
    }

    public getType(): string | null {
        return null;
    }
}
