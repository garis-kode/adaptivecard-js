import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { ImageSetSize } from "../../Enum/ImageSetSize.js";
import { Spacing } from "../../Enum/Spacing.js";
import { HasHeight } from "../../Support/HasHeight.js";
import { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";
import { Image } from "./Image.js";

/**
 * A set of images, displayed side-by-side and wrapped across multiple rows as needed.
 */
export class ImageSet extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

  public static make(): ImageSet {
    return new ImageSet();
  }

  /**
   * Controls how the element should be vertically sized.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.hasHeight.height(height);
  }

  /**
   * Controls how the element should be horizontally aligned.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalAlignment(alignment: HorizontalAlignment): this {
    return this.hasHorizontalAlignment.horizontalAlignment(alignment);
  }

  /**
   * Controls the amount of space between this element and the preceding one.
   * Valid values: "none", "extraSmall", "small", "default", "medium", "large", "extraLarge", "padding".
   */
  public spacing(spacing: Spacing): this {
    return this.hasSpacing.spacing(spacing);
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
