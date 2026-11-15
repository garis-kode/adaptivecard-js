import { AbstractGraphComponent } from './AbstractGraphComponent.ts';
import type { PersonaProperties } from './PersonaProperties.ts';

/**
 * Displays a user's information, including their profile picture.
 */
export class Persona extends AbstractGraphComponent {
    public static make(): Persona {
        return new Persona();
    }

    protected name(): string {
        return 'graph.microsoft.com/user';
    }

    /**
     * The properties of the Persona component.
     * Valid values: "PersonaProperties".
     */
    public properties(properties: PersonaProperties): this {
        return this.set('properties', properties);
    }
}
