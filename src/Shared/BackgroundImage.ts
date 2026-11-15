import { HorizontalAlignment } from "../Enum/HorizontalAlignment.js";
import { ImageFillMode } from "../Enum/ImageFillMode.js";
import { VerticalAlignment } from "../Enum/VerticalAlignment.js";
import { Node } from "../Node.js";

/**
 * Defines the container's background image.
 */
export class BackgroundImage extends Node {
  public constructor(url: string) {
    super();
    this.url(url);
  }

  public static make(url: string): BackgroundImage {
    return new BackgroundImage(url);
  }

  /**
   * The URL (or data url) of the image.
   */
  public url(url: string): this {
    return this.set("url", url);
  }

  /**
   * Describes how the image should fill the area.
   * Valid values: "cover", "repeatHorizontally", "repeatVertically", "repeat".
   */
  public fillMode(fillMode: ImageFillMode): this {
    return this.set("fillMode", fillMode);
  }

  /**
   * Describes how the image should be aligned if it must be cropped or if using repeat streams.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalAlignment(alignment: HorizontalAlignment): this {
    return this.set("horizontalAlignment", alignment);
  }

  /**
   * Describes how the image should be aligned if it must be cropped or if using repeat streams.
   * Valid values: "Top", "Center", "Bottom".
   */
  public verticalAlignment(alignment: VerticalAlignment): this {
    return this.set("verticalAlignment", alignment);
  }

  public getType(): string | null {
    return null;
  }
}
