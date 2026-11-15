import { ChartColorSet } from "../../Enum/ChartColorSet.js";
import { ChartDisplayMode } from "../../Enum/ChartDisplayMode.js";
import { AbstractCartesianChart } from "../AbstractCartesianChart.js";
import { BarChartDataValue } from "./BarChartDataValue.js";
import { HorizontalBarChartDataValue } from "./HorizontalBarChartDataValue.js";

/**
 * A horizontal bar chart.
 */
export class HorizontalBarChart extends AbstractCartesianChart {
  public constructor(
    title: string,
    data: Iterable<HorizontalBarChartDataValue | BarChartDataValue>,
    showTitle: boolean | null = null,
    xAxisTitle: string | null = null,
    yAxisTitle: string | null = null,
    colorSet: ChartColorSet | null = null,
  ) {
    super();
    this.title(title);
    this.data(data);

    if (showTitle !== null) {
      this.showTitle(showTitle);
    }
    if (xAxisTitle !== null) {
      this.xAxisTitle(xAxisTitle);
    }
    if (yAxisTitle !== null) {
      this.yAxisTitle(yAxisTitle);
    }
    if (colorSet !== null) {
      this.colorSet(colorSet);
    }
  }

  public static make(
    title: string,
    data: Iterable<HorizontalBarChartDataValue | BarChartDataValue>,
    showTitle: boolean | null = null,
    xAxisTitle: string | null = null,
    yAxisTitle: string | null = null,
    colorSet: ChartColorSet | null = null,
  ): HorizontalBarChart {
    return new HorizontalBarChart(
      title,
      data,
      showTitle,
      xAxisTitle,
      yAxisTitle,
      colorSet,
    );
  }

  /**
   * Add the data points in the chart.
   */
  public addData(
    data:
      | HorizontalBarChartDataValue
      | BarChartDataValue
      | Iterable<HorizontalBarChartDataValue | BarChartDataValue>,
  ): this {
    if (
      !(data instanceof HorizontalBarChartDataValue) &&
      !(data instanceof BarChartDataValue) &&
      Symbol.iterator in Object(data)
    ) {
      for (const item of data) {
        this.push("data", item);
      }

      return this;
    }

    return this.push("data", data);
  }

  /**
   * The data to display in the chart.
   * Valid values: "HorizontalBarChartDataValue".
   */
  public data(
    data: Iterable<HorizontalBarChartDataValue | BarChartDataValue>,
  ): this {
    return this.addData(data);
  }

  /**
   * Controls how the chart should be visually laid out.
   * Valid values: "AbsoluteWithAxis", "AbsoluteNoAxis", "PartToWhole".
   */
  public displayMode(mode: ChartDisplayMode): this {
    return this.set("displayMode", mode);
  }

  public getType(): string {
    return "Chart.HorizontalBar";
  }
}
