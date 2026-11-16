import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";

/**
 * Defines the source URL of a media stream. YouTube, Dailymotion, Vimeo, and Microsoft Stream URLs are supported.
 */
export class MediaSource extends Node implements HasKey {
  constructor(url: string | null = null, mimeType: string | null = null) {
    super();
    if (url !== null) {
      this.url(url);
    }
    if (mimeType !== null) {
      this.mimeType(mimeType);
    }
  }

  public static make(
    url: string | null = null,
    mimeType: string | null = null,
  ): MediaSource {
    return new MediaSource(url, mimeType);
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

  public getType(): string | null {
    return null;
  }
}
