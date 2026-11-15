import { ChartColorSet } from "../../Enum/ChartColorSet.js";
import { AbstractCartesianChart } from "../AbstractCartesianChart.js";
import { VerticalBarChartDataValue } from "./VerticalBarChartDataValue.js";

/**
 * A vertical bar chart.
 */
export class VerticalBarChart extends AbstractCartesianChart {
  public constructor(
    title: string,
    data: Iterable<VerticalBarChartDataValue>,
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
    data: Iterable<VerticalBarChartDataValue>,
    showTitle: boolean | null = null,
    xAxisTitle: string | null = null,
    yAxisTitle: string | null = null,
    colorSet: ChartColorSet | null = null,
  ): VerticalBarChart {
    return new VerticalBarChart(
      title,
      data,
      showTitle,
      xAxisTitle,
      yAxisTitle,
      colorSet,
    );
  }

  /**
   * Add the data to display in the chart.
   */
  public addData(
    data: VerticalBarChartDataValue | Iterable<VerticalBarChartDataValue>,
  ): this {
    if (
      !(data instanceof VerticalBarChartDataValue) &&
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
   * Valid values: "VerticalBarChartDataValue".
   */
  public data(data: Iterable<VerticalBarChartDataValue>): this {
    return this.addData(data);
  }

  /**
   * Controls if the bar values should be displayed.
   */
  public showBarValues(show: boolean = true): this {
    return this.set("showBarValues", show);
  }

  /**
   * The requested minimum for the Y axis range. The value used at runtime may be different to optimize visual presentation.
   */
  public yMin(min: number): this {
    return this.set("yMin", min);
  }

  /**
   * The requested maximum for the Y axis range. The value used at runtime may be different to optimize visual presentation.
   */
  public yMax(max: number): this {
    return this.set("yMax", max);
  }

  public getType(): string {
    return "Chart.VerticalBar";
  }
}
