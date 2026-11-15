import { Node } from "../Node.js";

/**
 * Represents information about the iFrame content, rendered in the collab stage popout window.
 */
export class TabInfo extends Node {
  public constructor(
    contentUrl: string | null = null,
    websiteUrl: string | null = null,
    name: string | null = null,
    entityId: string | null = null,
  ) {
    super();
    if (contentUrl !== null) {
      this.contentUrl(contentUrl);
    }
    if (websiteUrl !== null) {
      this.websiteUrl(websiteUrl);
    }
    if (name !== null) {
      this.name(name);
    }
    if (entityId !== null) {
      this.entityId(entityId);
    }
  }

  public static make(
    contentUrl: string | null = null,
    websiteUrl: string | null = null,
    name: string | null = null,
    entityId: string | null = null,
  ): TabInfo {
    return new TabInfo(contentUrl, websiteUrl, name, entityId);
  }

  /**
   * The URL to open in an iFrame.
   */
  public contentUrl(url: string): this {
    return this.set("contentUrl", url);
  }

  /**
   * An optional website URL to the content, allowing users to open this content in the browser (if they prefer).
   */
  public websiteUrl(url: string): this {
    return this.set("websiteUrl", url);
  }

  /**
   * The name for the content. This will be displayed as the title of the window hosting the iFrame.
   */
  public name(name: string): this {
    return this.set("name", name);
  }

  /**
   * The unique entity id for this content (e.g., random UUID).
   */
  public entityId(id: string): this {
    return this.set("entityId", id);
  }

  public getType(): string | null {
    return null;
  }
}
