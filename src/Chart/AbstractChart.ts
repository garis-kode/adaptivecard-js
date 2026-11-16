import { AbstractBlockElement } from "../Element/AbstractBlockElement.js";
import { ChartColorSet } from "../Enum/ChartColorSet.js";
import { Height } from "../Enum/Height.js";
import { HorizontalAlignment } from "../Enum/HorizontalAlignment.js";
import { Spacing } from "../Enum/Spacing.js";
import type { HasHeight } from "../Support/HasHeight.js";
import type { HasHorizontalAlignment } from "../Support/HasHorizontalAlignment.js";
import type { HasSpacing } from "../Support/HasSpacing.js";

export abstract class AbstractChart
  extends AbstractBlockElement
  implements HasHeight, HasHorizontalAlignment, HasSpacing
{
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
   * The title of the chart.
   */
  public title(title: string): this {
    return this.set("title", title);
  }

  /**
   * The name of the set of colors to use to render the chart.
   * Valid values: "categorical", "sequential", "sequentialred", "sequentialgreen", "sequentialyellow", "diverging".
   */
  public colorSet(colorSet: ChartColorSet): this {
    return this.set("colorSet", colorSet);
  }

  /**
   * The maximum width, in pixels, of the chart, in the <number>px format.
   * Valid values: "<number>px".
   */
  public maxWidth(maxWidth: string): this {
    return this.set("maxWidth", maxWidth);
  }

  /**
   * Controls whether the chart's legend should be displayed.
   */
  public showLegend(show: boolean = true): this {
    return this.set("showLegend", show);
  }

  /**
   * Controls whether the chart's title should be displayed. Defaults to false.
   */
  public showTitle(show: boolean = true): this {
    return this.set("showTitle", show);
  }
}
