import { AbstractAction } from '../../Action/AbstractAction.ts';
import { ImageStyle } from '../../Enum/ImageStyle.ts';
import { TextSize } from '../../Enum/TextSize.ts';
import { ThemedUrl } from '../../Other/ThemedUrl.ts';
import { AbstractInlineElement } from '../AbstractInlineElement.ts';

/**
 * An inline image inside a RichTextBlock element.
 */
export class ImageRun extends AbstractInlineElement {
  constructor(url: string) {
    super();
    this.url(url);
  }

  public static make(url: string): ImageRun {
    return new ImageRun(url);
  }

  /**
   * The URL (or Base64-encoded Data URI) of the image. Acceptable formats are PNG, JPEG, GIF and SVG.
   */
  public url(url: string): this {
    return this.set('url', url);
  }

  /**
   * The size of the inline image.
   * Valid values: "Small", "Default", "Medium", "Large", "ExtraLarge".
   */
  public size(size: TextSize): this {
    return this.set('size', size);
  }

  /**
   * The style of the inline image.
   * Valid values: "Default", "Person", "RoundedCorners".
   */
  public style(style: ImageStyle): this {
    return this.set('style', style);
  }

  /**
   * Add a set of theme-specific image URLs.
   */
  public addThemedUrls(themedUrl: ThemedUrl | Iterable<ThemedUrl>): this {
    if (!(themedUrl instanceof ThemedUrl) && Symbol.iterator in Object(themedUrl)) {
      for (const item of themedUrl) {
        this.push('themedUrls', item);
      }

      return this;
    }

    return this.push('themedUrls', themedUrl);
  }

  /**
   * A set of theme-specific image URLs.
   * Valid values: "ThemedUrl".
   */
  public themedUrls(themedUrls: Iterable<ThemedUrl>): this {
    return this.addThemedUrls(themedUrls);
  }

  /**
   * An Action that will be invoked when the image is tapped or clicked.
   * Action.ShowCard is not supported.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl", "Action.OpenUrlDialog",
   * "Action.Popover", "Action.ResetInputs", "Action.RunCommands", "Action.Submit", "Action.ToggleVisibility".
   */
  public selectAction(action: AbstractAction): this {
    return this.set('selectAction', action);
  }

  public getType(): string {
    return 'ImageRun';
  }
}
