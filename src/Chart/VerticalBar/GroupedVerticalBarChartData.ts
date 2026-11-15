import { ChartColor } from '../../Enum/ChartColor.ts';
import { Node } from '../../Node.ts';
import { HasKey } from '../../Support/HasKey.ts';
import { BarChartDataValue } from '../HorizontalBar/BarChartDataValue.ts';

/**
 * Represents a series of data points in a grouped vertical bar chart.
 */
export class GroupedVerticalBarChartData extends Node {
    private readonly hasKey = new HasKey(this);

    public constructor(
        legend: string,
        values: Iterable<BarChartDataValue> = [],
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
        values: Iterable<BarChartDataValue> = [],
        color: ChartColor | null = null,
        key: string | null = null,
    ): GroupedVerticalBarChartData {
        return new GroupedVerticalBarChartData(legend, values, color, key);
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
        return this.set('legend', legend);
    }

    /**
     * The color to use for all data points in the series.
     */
    public color(color: ChartColor): this {
        return this.set('color', color);
    }

    /**
     * Add the data points in the series.
     */
    public addValues(point: BarChartDataValue | Iterable<BarChartDataValue>): this {
        if (!(point instanceof BarChartDataValue) && Symbol.iterator in Object(point)) {
            for (const item of point) {
                this.push('values', item);
            }

            return this;
        }

        return this.push('values', point);
    }

    /**
     * The data points in the series.
     */
    public values(values: Iterable<BarChartDataValue>): this {
        return this.addValues(values);
    }

    public getType(): string | null {
        return null;
    }
}
