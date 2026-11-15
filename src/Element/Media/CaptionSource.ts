import { Node } from "../../Node.js";
import { HasKey } from "../../Support/HasKey.js";

/**
 * Defines a source URL for a video captions.
 */
export class CaptionSource extends Node {
  private readonly hasKey = new HasKey(this);

  constructor(url: string, mimeType: string, label: string) {
    super();
    this.url(url);
    this.mimeType(mimeType);
    this.label(label);
  }

  public static make(
    url: string,
    mimeType: string,
    label: string,
  ): CaptionSource {
    return new CaptionSource(url, mimeType, label);
  }

  /**
   * Key that identifies the element in the list of items.
   */
  public key(key: string): this {
    return this.hasKey.key(key);
  }

  /**
   * The URL of the source.
   */
  public url(url: string): this {
    return this.set("url", url);
  }

  /**
   * The MIME type of the source.
   */
  public mimeType(mimeType: string): this {
    return this.set("mimeType", mimeType);
  }

  /**
   * The label of this caption source.
   */
  public label(label: string): this {
    return this.set("label", label);
  }

  public getType(): string | null {
    return null;
  }
}
