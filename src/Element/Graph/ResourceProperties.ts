import { Node } from '../../Node.ts';
import { HasKey } from '../../Support/HasKey.ts';
import type { ResourceVisualization } from './ResourceVisualization.ts';

/**
 * Represents the properties of a resource component.
 */
export class ResourceProperties extends Node {
    private readonly hasKey = new HasKey(this);

    public static make(): ResourceProperties {
        return new ResourceProperties();
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
     * The Id of the resource.
     */
    public id(id: string): this {
        return this.set('id', id);
    }

    /**
     * The reference to the resource.
     */
    public resourceReference(resourceReference: Record<string, string>): this {
        return this.set('resourceReference', { ...resourceReference });
    }

    /**
     * The visualization of the resource.
     * Valid values: "ResourceVisualization".
     */
    public resourceVisualization(resourceVisualization: ResourceVisualization): this {
        return this.set('resourceVisualization', resourceVisualization);
    }

    public getType(): string | null {
        return null;
    }
}
