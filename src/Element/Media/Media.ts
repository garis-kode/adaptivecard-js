import { Height } from "../../Enum/Height.js";
import { Spacing } from "../../Enum/Spacing.js";
import type { HasHeight } from "../../Support/HasHeight.js";
import type { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";
import { CaptionSource } from "./CaptionSource.js";
import { MediaSource } from "./MediaSource.js";

/**
 * A media element that makes it possible to embed videos inside a card.
 */
export class Media
  extends AbstractBlockElement
  implements HasHeight, HasSpacing
{
  public static make(): Media {
    return new Media();
  }

  /**
   * The height of the element. When set to `stretch`, the element will use
   * the remaining vertical space in its container.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.set("height", height);
  }

  /**
   * Controls the amount of space between this element and the previous one.
   * No space will be added for the first element in a container.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  public spacing(spacing: Spacing): this {
    return this.set("spacing", spacing);
  }

  /**
   * Add sources for the media.
   */
  public addSources(source: MediaSource | Iterable<MediaSource>): this {
    if (!(source instanceof MediaSource) && Symbol.iterator in Object(source)) {
      for (const item of source) {
        this.push("sources", item);
      }

      return this;
    }

    return this.push("sources", source);
  }

  /**
   * The sources for the media. For YouTube, Dailymotion and Vimeo, only one source can be specified.
   * Valid values: "MediaSource".
   */
  public sources(sources: Iterable<MediaSource>): this {
    return this.addSources(sources);
  }

  /**
   * Add caption sources for the media.
   */
  public addCaptionSources(
    source: CaptionSource | Iterable<CaptionSource>,
  ): this {
    if (
      !(source instanceof CaptionSource) &&
      Symbol.iterator in Object(source)
    ) {
      for (const item of source) {
        this.push("captionSources", item);
      }

      return this;
    }

    return this.push("captionSources", source);
  }

  /**
   * The caption sources for the media. Caption sources are not used for YouTube, Dailymotion or Vimeo sources.
   * Valid values: "CaptionSource".
   */
  public captionSources(captionSources: Iterable<CaptionSource>): this {
    return this.addCaptionSources(captionSources);
  }

  /**
   * The URL of the poster image to display.
   */
  public poster(url: string): this {
    return this.set("poster", url);
  }

  /**
   * The alternate text for the media, used for accessibility purposes.
   */
  public altText(altText: string): this {
    return this.set("altText", altText);
  }

  public getType(): string {
    return "Media";
  }
}
