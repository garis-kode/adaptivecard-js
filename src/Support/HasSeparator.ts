import type { Node } from '../Node.ts';

export class HasSeparator<T extends Node> {
    public constructor(private readonly host: T) {}

    /**
     * Controls whether a separator line should be displayed above the element
     * to visually separate it from the previous element. No separator will be
     * displayed for the first element in a container, even if this property is
     * set to true.
     */
    public separator(separator: boolean = true): T {
        return this.host.setProperty('separator', separator);
    }
}
