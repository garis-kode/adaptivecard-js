import { ChartColor } from "../Enum/ChartColor.js";
import { AbstractChart } from "./AbstractChart.js";

/**
 * Base class for charts rendered against x and y axes.
 */
export abstract class AbstractCartesianChart extends AbstractChart {
  /**
   * The color to use for all data points.
   */
  public color(color: ChartColor): this {
    return this.set("color", color);
  }

  /**
   * The title of the x axis.
   */
  public xAxisTitle(xAxisTitle: string): this {
    return this.set("xAxisTitle", xAxisTitle);
  }

  /**
   * The title of the y axis.
   */
  public yAxisTitle(yAxisTitle: string): this {
    return this.set("yAxisTitle", yAxisTitle);
  }
}
