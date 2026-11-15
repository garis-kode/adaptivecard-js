import { ChartColorSet } from "../../Enum/ChartColorSet.js";
import { Width } from "../../Enum/Width.js";
import { AbstractCartesianChart } from "../AbstractCartesianChart.js";
import { LineChartData } from "./LineChartData.js";

/**
 * A line chart.
 */
export class LineChart extends AbstractCartesianChart {
  public constructor(
    title: string,
    showTitle: boolean | null = null,
    xAxisTitle: string | null = null,
    yAxisTitle: string | null = null,
    colorSet: ChartColorSet | null = null,
    data: Iterable<LineChartData> | null = null,
  ) {
    super();
    this.title(title);

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
    if (data !== null) {
      this.data(data);
    }
  }

  public static make(
    title: string,
    showTitle: boolean | null = null,
    xAxisTitle: string | null = null,
    yAxisTitle: string | null = null,
    colorSet: ChartColorSet | null = null,
    data: Iterable<LineChartData> | null = null,
  ): LineChart {
    return new LineChart(
      title,
      showTitle,
      xAxisTitle,
      yAxisTitle,
      colorSet,
      data,
    );
  }

  /**
   * The maximum y range.
   */
  public yMin(yMin: number): this {
    return this.set("yMin", yMin);
  }

  /**
   * The minimum y range.
   */
  public yMax(yMax: number): this {
    return this.set("yMax", yMax);
  }

  /**
   * The minimum width reserved for the x axis labels. When the available space is insufficient, the
   * chart selectively renders fewer labels instead of truncating them. `auto` will automatically adjust
   * the labels' minimum width according to its content and using the `<number>px` format will give the
   * labels an explicit minimum width in pixels.
   * Valid values: "auto", "<number>px".
   */
  public xAxisLabelMinWidth(width: Width | string): this {
    return this.set("xAxisLabelMinWidth", width);
  }

  /**
   * Add the data point series in the line chart.
   */
  public addData(data: LineChartData | Iterable<LineChartData>): this {
    if (!(data instanceof LineChartData) && Symbol.iterator in Object(data)) {
      for (const item of data) {
        this.push("data", item);
      }

      return this;
    }

    return this.push("data", data);
  }

  /**
   * The data point series in the line chart.
   * Valid values: "LineChartData".
   */
  public data(data: Iterable<LineChartData>): this {
    return this.addData(data);
  }

  public getType(): string {
    return "Chart.Line";
  }
}
