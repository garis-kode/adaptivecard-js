import { Node } from "../../Node.js";
import { HasKey } from "../../Support/HasKey.js";

/**
 * Represents the properties of a file component.
 */
export class FileProperties extends Node {
  private readonly hasKey = new HasKey(this);

  public static make(): FileProperties {
    return new FileProperties();
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
   * The file extension.
   */
  public extension(extension: string): this {
    return this.set("extension", extension);
  }

  /**
   * The name of the file.
   */
  public name(name: string): this {
    return this.set("name", name);
  }

  /**
   * The URL of the file.
   */
  public url(url: string): this {
    return this.set("url", url);
  }

  public getType(): string | null {
    return null;
  }
}
