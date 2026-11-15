import { AbstractAction } from "../../Action/AbstractAction.js";
import { Height } from "../../Enum/Height.js";
import { HorizontalAlignment } from "../../Enum/HorizontalAlignment.js";
import { ImageFitMode } from "../../Enum/ImageFitMode.js";
import { ImageSize } from "../../Enum/ImageSize.js";
import { ImageStyle } from "../../Enum/ImageStyle.js";
import { Spacing } from "../../Enum/Spacing.js";
import { VerticalAlignment } from "../../Enum/VerticalAlignment.js";
import { Width } from "../../Enum/Width.js";
import { ThemedUrl } from "../../Other/ThemedUrl.js";
import { HasHorizontalAlignment } from "../../Support/HasHorizontalAlignment.js";
import { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";
import { TeamsImageProperties } from "./TeamsImageProperties.js";

/**
 * A standalone image element.
 */
export class Image extends AbstractBlockElement {
  private readonly hasHorizontalAlignment = new HasHorizontalAlignment(this);
  private readonly hasSpacing = new HasSpacing(this);

  constructor(url: string | null = null) {
    super();
    if (url !== null) {
      this.url(url);
    }
  }

  public static make(url: string | null = null): Image {
    return new Image(url);
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
   * The URL (or Base64-encoded Data URI) of the image. Acceptable formats are PNG, JPEG, GIF and SVG.
   */
  public url(url: string): this {
    return this.set("url", url);
  }

  /**
   * The alternate text for the image, used for accessibility purposes.
   */
  public altText(altText: string): this {
    return this.set("altText", altText);
  }

  /**
   * The size of the image.
   * Valid values: "Auto", "Stretch", "Small", "Medium", "Large".
   */
  public size(size: ImageSize): this {
    return this.set("size", size);
  }

  /**
   * The style of the image.
   * Valid values: "Default", "Person", "RoundedCorners".
   */
  public style(style: ImageStyle): this {
    return this.set("style", style);
  }

  /**
   * The background color of the image in the `#RRGGBB` or `#AARRGGBB` format.
   */
  public backgroundColor(color: string): this {
    return this.set("backgroundColor", color);
  }

  /**
   * The width of the image.
   * Valid values: "auto", "stretch", "<number>px".
   */
  public width(width: Width | string): this {
    return this.set("width", width);
  }

  /**
   * The height of the image.
   * Valid values: "auto", "stretch", "<number>px".
   */
  public height(height: Height | string): this {
    return this.set("height", height);
  }

  /**
   * Controls if the image can be expanded to full screen.
   */
  public allowExpand(allow = true): this {
    return this.set("allowExpand", allow);
  }

  /**
   * Controls how the image should be fitted inside its bounding box. `imageFit` is
   * only meaningful when both the width and height properties are set. When `fitMode`
   * is set to `contain`, the default style is always used.
   * Valid values: "Cover", "Contain", "Fill".
   */
  public fitMode(fitMode: ImageFitMode): this {
    return this.set("fitMode", fitMode);
  }

  /**
   * Controls the horizontal position of the image within its bounding box.
   * `horizontalContentAlignment` is only meaningful when both the width and height
   * properties are set and `fitMode` is set to either `cover` or `contain`.
   * Valid values: "Left", "Center", "Right".
   */
  public horizontalContentAlignment(alignment: HorizontalAlignment): this {
    return this.set("horizontalContentAlignment", alignment);
  }

  /**
   * Controls the vertical position of the image within its bounding box.
   * `verticalContentAlignment` is only meaningful when both the width and height
   * properties are set and `fitMode` is set to either `cover` or `contain`.
   * Valid values: "Top", "Center", "Bottom".
   */
  public verticalContentAlignment(alignment: VerticalAlignment): this {
    return this.set("verticalContentAlignment", alignment);
  }

  /**
   * Add a set of theme-specific image URLs.
   */
  public addThemedUrls(themedUrl: ThemedUrl | Iterable<ThemedUrl>): this {
    if (
      !(themedUrl instanceof ThemedUrl) &&
      Symbol.iterator in Object(themedUrl)
    ) {
      for (const item of themedUrl) {
        this.push("themedUrls", item);
      }

      return this;
    }

    return this.push("themedUrls", themedUrl);
  }

  /**
   * A set of theme-specific image URLs.
   * Valid values: "ThemedUrl".
   */
  public themedUrls(themedUrls: Iterable<ThemedUrl>): this {
    return this.addThemedUrls(themedUrls);
  }

  /**
   * Teams-specific metadata associated with the image.
   * Valid values: "TeamsImageProperties".
   */
  public msteams(
    properties: TeamsImageProperties,
    useCamelCaseKey = false,
  ): this {
    if (useCamelCaseKey) {
      return this.set("msTeams", properties);
    }

    return this.set("msteams", properties);
  }

  /**
   * An Action that will be invoked when the image is tapped or clicked.
   * Action.ShowCard is not supported.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.Popover", "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
   */
  public selectAction(action: AbstractAction): this {
    return this.set("selectAction", action);
  }

  public getType(): string {
    return "Image";
  }
}
