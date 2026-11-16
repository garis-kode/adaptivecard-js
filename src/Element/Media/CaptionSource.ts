import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";

/**
 * Defines a source URL for a video captions.
 */
export class CaptionSource extends Node implements HasKey {
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
   * Defines an optional key for the object. Keys are seldom needed, but in
   * some scenarios, specifying keys can help maintain visual state in the
   * host application.
   */
  public key(key: string): this {
    return this.set("key", key);
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
