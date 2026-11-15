import { Node } from "../Node.js";
import { HasKey } from "../Support/HasKey.js";

/**
 * A type of reference whose content is an Adaptive Card.
 */
export class AdaptiveCardReference extends Node {
  private readonly hasKey = new HasKey(this);

  public static make(): AdaptiveCardReference {
    return new AdaptiveCardReference();
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
   * Title of the reference.
   */
  public title(title: string): this {
    return this.set("title", title);
  }

  /**
   * The abstract of the reference, providing a short summary of the reference's content.
   */
  public abstract(abstract: string): this {
    return this.set("abstract", abstract);
  }

  /**
   * Must be an Adaptive Card payload.
   */
  public content(content: unknown): this {
    return this.set("content", content);
  }

  /**
   * Icon to be displayed in the reference.
   * Valid values: "msWord", "msExcel", "msPowerPoint", "msOneNote", "msSharePoint",
   * "msVisio", "msLoop", "msWhiteboard", "code", "sketch", "adobeIllustrator",
   * "adobePhotoshop", "adobeInDesign", "adobeFlash", "image", "gif", "video",
   * "sound", "zip", "text", "pdf".
   */
  public icon(icon: string): this {
    return this.set("icon", icon);
  }

  /**
   * Keywords for the reference. Maximum allowed is 3.
   */
  public keywords(keywords: string[]): this {
    return this.set("keywords", keywords.slice(0, 3));
  }

  /**
   * Optional URL for the reference title.
   */
  public url(url: string): this {
    return this.set("url", url);
  }

  public getType(): string {
    return "AdaptiveCardReference";
  }
}
