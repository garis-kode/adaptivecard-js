import { ChartColor } from "../../Enum/ChartColor.js";
import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";

/**
 * The legend of the gauge chart.
 */
export class GaugeChartLegend extends Node implements HasKey {
  public constructor(
    legend: string,
    size: number,
    color: ChartColor | null = null,
    key: string | null = null,
  ) {
    super();
    this.legend(legend);
    this.size(size);

    if (color !== null) {
      this.color(color);
    }
    if (key !== null) {
      this.key(key);
    }
  }

  public static make(
    legend: string,
    size: number,
    color: ChartColor | null = null,
    key: string | null = null,
  ): GaugeChartLegend {
    return new GaugeChartLegend(legend, size, color, key);
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
   * The legend text associated with the segment.
   */
  public legend(legend: string): this {
    return this.set("legend", legend);
  }

  /**
   * The size of the segment.
   */
  public size(size: number): this {
    return this.set("size", size);
  }

  /**
   * The color to use for the segment.
   */
  public color(color: ChartColor): this {
    return this.set("color", color);
  }

  public getType(): string | null {
    return null;
  }
}
