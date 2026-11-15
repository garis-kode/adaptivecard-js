import { AbstractGraphComponent } from "./AbstractGraphComponent.js";
import type { ResourceProperties } from "./ResourceProperties.js";

/**
 * Displays information about a generic graph resource.
 */
export class GraphResource extends AbstractGraphComponent {
  public static make(): GraphResource {
    return new GraphResource();
  }

  protected name(): string {
    return "graph.microsoft.com/resource";
  }

  /**
   * The properties of the resource.
   * Valid values: "ResourceProperties".
   */
  public properties(properties: ResourceProperties): this {
    return this.set("properties", properties);
  }
}
