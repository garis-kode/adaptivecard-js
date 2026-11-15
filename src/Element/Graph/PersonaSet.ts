import { AbstractGraphComponent } from './AbstractGraphComponent.ts';
import type { PersonaSetProperties } from './PersonaSetProperties.ts';

/**
 * Displays multiple users' information, including their profile pictures.
 */
export class PersonaSet extends AbstractGraphComponent {
    public static make(): PersonaSet {
        return new PersonaSet();
    }

    protected name(): string {
        return 'graph.microsoft.com/users';
    }

    /**
     * The properties of the PersonaSet component.
     * Valid values: "PersonaSetProperties".
     */
    public properties(properties: PersonaSetProperties): this {
        return this.set('properties', properties);
    }
}
