import { Node } from '../../Node.ts';
import { HasKey } from '../../Support/HasKey.ts';

/**
 * Defines the source URL of a media stream. YouTube, Dailymotion, Vimeo, and Microsoft Stream URLs are supported.
 */
export class MediaSource extends Node {
  private readonly hasKey = new HasKey(this);

  constructor(url: string | null = null, mimeType: string | null = null) {
    super();
    if (url !== null) {
      this.url(url);
    }
    if (mimeType !== null) {
      this.mimeType(mimeType);
    }
  }

  public static make(url: string | null = null, mimeType: string | null = null): MediaSource {
    return new MediaSource(url, mimeType);
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
    return this.set('url', url);
  }

  /**
   * The MIME type of the source.
   */
  public mimeType(mimeType: string): this {
    return this.set('mimeType', mimeType);
  }

  public getType(): string | null {
    return null;
  }
}
