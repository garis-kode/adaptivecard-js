import { ChartColor } from "../../Enum/ChartColor.js";
import { Node } from "../../Node.js";
import { HasKey } from "../../Support/HasKey.js";
import { LineChartValue } from "./LineChartValue.js";

/**
 * Represents a series of data points in a line chart.
 */
export class LineChartData extends Node {
  private readonly hasKey = new HasKey(this);

  public constructor(
    legend: string,
    values: Iterable<LineChartValue> = [],
    color: ChartColor | null = null,
    key: string | null = null,
  ) {
    super();
    this.legend(legend);

    if (color !== null) {
      this.color(color);
    }
    this.values(values);
    if (key !== null) {
      this.key(key);
    }
  }

  public static make(
    legend: string,
    values: Iterable<LineChartValue> = [],
    color: ChartColor | null = null,
    key: string | null = null,
  ): LineChartData {
    return new LineChartData(legend, values, color, key);
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
   * The legend of the chart.
   */
  public legend(legend: string): this {
    return this.set("legend", legend);
  }

  /**
   * The color all data points in the series.
   */
  public color(color: ChartColor): this {
    return this.set("color", color);
  }

  /**
   * Add the data points in the series.
   */
  public addValues(point: LineChartValue | Iterable<LineChartValue>): this {
    if (
      !(point instanceof LineChartValue) &&
      Symbol.iterator in Object(point)
    ) {
      for (const item of point) {
        this.push("values", item);
      }

      return this;
    }

    return this.push("values", point);
  }

  /**
   * The data points in the series.
   */
  public values(values: Iterable<LineChartValue>): this {
    return this.addValues(values);
  }

  public getType(): string | null {
    return null;
  }
}
