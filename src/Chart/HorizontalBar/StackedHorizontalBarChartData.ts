import { Node } from "../../Node.js";
import { HasKey } from "../../Support/HasKey.js";
import { StackedHorizontalBarChartDataPoint } from "./StackedHorizontalBarChartDataPoint.js";

/**
 * Defines a data series to display in a stacked horizontal bar chart.
 */
export class StackedHorizontalBarChartData extends Node {
  private readonly hasKey = new HasKey(this);

  public constructor(
    title: string,
    data: Iterable<StackedHorizontalBarChartDataPoint> = [],
    key: string | null = null,
  ) {
    super();
    this.title(title);
    this.data(data);
    if (key !== null) {
      this.key(key);
    }
  }

  public static make(
    title: string,
    data: Iterable<StackedHorizontalBarChartDataPoint> = [],
    key: string | null = null,
  ): StackedHorizontalBarChartData {
    return new StackedHorizontalBarChartData(title, data, key);
  }

  /**
   * Defines an optional key for the object. Keys are seldom needed, but in
   * some scenarios, specifying keys can help maintain visual state in the
   * host application.
   */
  public key(key: string): this {
    return this.hasKey.key(key);
  }

  /**
   * The title of the series.
   */
  public title(title: string): this {
    return this.set("title", title);
  }

  /**
   * Add the data points in the series.
   */
  public addData(
    data:
      | StackedHorizontalBarChartDataPoint
      | Iterable<StackedHorizontalBarChartDataPoint>,
  ): this {
    if (
      !(data instanceof StackedHorizontalBarChartDataPoint) &&
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
   * The data points in the series.
   */
  public data(points: Iterable<StackedHorizontalBarChartDataPoint>): this {
    return this.addData(points);
  }

  public getType(): string | null {
    return null;
  }
}
