import { Node } from '../../Node.ts';

/**
 * Defines a target element in an Action.ToggleVisibility.
 */
export class TargetElement extends Node {
    public constructor(elementId: string, isVisible: boolean | null = null) {
        super();
        this.elementId(elementId);

        if (isVisible !== null) {
            this.isVisible(isVisible);
        }
    }

    public static make(elementId: string, isVisible: boolean | null = null): TargetElement {
        return new TargetElement(elementId, isVisible);
    }

    /**
     * The Id of the element to change the visibility of.
     */
    public elementId(elementId: string): this {
        return this.set('elementId', elementId);
    }

    /**
     * The new visibility state of the element.
     */
    public isVisible(isVisible: boolean = true): this {
        return this.set('isVisible', isVisible);
    }

    public getType(): string | null {
        return null;
    }
}
