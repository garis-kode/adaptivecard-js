import { ChartColor } from "../../Enum/ChartColor.js";
import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";

/**
 * A data point in a donut or pie chart.
 */
export class DonutChartData extends Node implements HasKey {
  public constructor(
    legend: string,
    value: number,
    color: ChartColor | null = null,
    key: string | null = null,
  ) {
    super();
    this.legend(legend);
    this.value(value);

    if (color !== null) {
      this.color(color);
    }
    if (key !== null) {
      this.key(key);
    }
  }

  public static make(
    legend: string,
    value: number,
    color: ChartColor | null = null,
    key: string | null = null,
  ): DonutChartData {
    return new DonutChartData(legend, value, color, key);
  }

  /**
   * Defines an optional key for the object. Keys are seldom needed, but in
   * some scenarios, specifying keys can help maintain visual state in the
   * host application.
   */
  public key(key: string): this {
    return this.set("key", key);
  }

  /**
   * The legend of the chart.
   */
  public legend(legend: string): this {
    return this.set("legend", legend);
  }

  /**
   * The value associated with the data point.
   */
  public value(value: number): this {
    return this.set("value", value);
  }

  /**
   * The color to use for the data point.
   */
  public color(color: ChartColor): this {
    return this.set("color", color);
  }

  public getType(): string | null {
    return null;
  }
}
