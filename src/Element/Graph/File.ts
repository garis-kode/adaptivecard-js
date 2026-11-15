import { AbstractGraphComponent } from "./AbstractGraphComponent.js";
import type { FileProperties } from "./FileProperties.js";

/**
 * Displays information about a file resource.
 */
export class File extends AbstractGraphComponent {
  public static make(): File {
    return new File();
  }

  protected name(): string {
    return "graph.microsoft.com/file";
  }

  /**
   * The properties of the file.
   * Valid values: "FileProperties".
   */
  public properties(properties: FileProperties): this {
    return this.set("properties", properties);
  }
}
