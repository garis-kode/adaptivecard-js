import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";

/**
 * Represents a data point in a line chart series.
 */
export class LineChartValue extends Node implements HasKey {
  public constructor(x: string | number, y: number, key: string | null = null) {
    super();
    this.x(x);
    this.y(y);

    if (key !== null) {
      this.key(key);
    }
  }

  public static make(
    x: string | number,
    y: number,
    key: string | null = null,
  ): LineChartValue {
    return new LineChartValue(x, y, key);
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
   * The x axis value of the data point.
   */
  public x(x: string | number): this {
    return this.set("x", x);
  }

  /**
   * The y axis value of the data point.
   */
  public y(y: number): this {
    return this.set("y", y);
  }

  public getType(): string | null {
    return null;
  }
}
