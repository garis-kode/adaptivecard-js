import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { ImageSetSize } from "../../Enum/ImageSetSize.js";
import { Spacing } from "../../Enum/Spacing.js";
import type { HasHeight } from "../../Support/HasHeight.js";
import type { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import type { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";
import { Image } from "./Image.js";

/**
 * A set of images, displayed side-by-side and wrapped across multiple rows as needed.
 */
export class ImageSet
  extends AbstractBlockElement
  implements HasHeight, HasHorizontalAlignment, HasSpacing
{
  public static make(): ImageSet {
    return new ImageSet();
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
   * Controls how the element should be horizontally aligned.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalAlignment(alignment: HorizontalAlignment): this {
    return this.set("horizontalAlignment", alignment);
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
   * Add an image to the image set.
   */
  public addImages(image: Image | Iterable<Image>): this {
    if (!(image instanceof Image) && Symbol.iterator in Object(image)) {
      for (const item of image) {
        this.push("images", item);
      }

      return this;
    }

    return this.push("images", image);
  }

  /**
   * The images in the set.
   * Valid values: "Image".
   */
  public images(images: Iterable<Image>): this {
    return this.addImages(images);
  }

  /**
   * The size to use to render all images in the set.
   * Valid values: "Small", "Medium", "Large".
   */
  public imageSize(size: ImageSetSize): this {
    return this.set("imageSize", size);
  }

  public getType(): string {
    return "ImageSet";
  }
}
