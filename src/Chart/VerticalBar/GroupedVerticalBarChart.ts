import { ChartColorSet } from '../../Enum/ChartColorSet.ts';
import { AbstractCartesianChart } from '../AbstractCartesianChart.ts';
import { GroupedVerticalBarChartData } from './GroupedVerticalBarChartData.ts';

/**
 * A grouped vertical bar chart.
 */
export class GroupedVerticalBarChart extends AbstractCartesianChart {
    public constructor(
        title: string,
        data: Iterable<GroupedVerticalBarChartData> | null = null,
        showTitle: boolean | null = null,
        xAxisTitle: string | null = null,
        yAxisTitle: string | null = null,
        colorSet: ChartColorSet | null = null,
    ) {
        super();
        this.title(title);

        if (data !== null) {
            this.data(data);
        }
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
        data: Iterable<GroupedVerticalBarChartData> | null = null,
        showTitle: boolean | null = null,
        xAxisTitle: string | null = null,
        yAxisTitle: string | null = null,
        colorSet: ChartColorSet | null = null,
    ): GroupedVerticalBarChart {
        return new GroupedVerticalBarChart(title, data, showTitle, xAxisTitle, yAxisTitle, colorSet);
    }

    /**
     * Controls if bars in the chart should be displayed as stacks instead of groups. Note: stacked vertical bar charts do not support custom Y ranges nor negative Y values.
     */
    public stacked(stacked: boolean = true): this {
        return this.set('stacked', stacked);
    }

    /**
     * Add the data points in a series.
     */
    public addData(data: GroupedVerticalBarChartData | Iterable<GroupedVerticalBarChartData>): this {
        if (!(data instanceof GroupedVerticalBarChartData) && Symbol.iterator in Object(data)) {
            for (const item of data) {
                this.push('data', item);
            }

            return this;
        }

        return this.push('data', data);
    }

    /**
     * The data points in a series.
     * Valid values: "GroupedVerticalBarChartData".
     */
    public data(data: Iterable<GroupedVerticalBarChartData>): this {
        return this.addData(data);
    }

    /**
     * Controls if values should be displayed on each bar.
     */
    public showBarValues(show: boolean = true): this {
        return this.set('showBarValues', show);
    }

    /**
     * The requested minimum for the Y axis range. The value used at runtime may be different to optimize visual presentation. `yMin` is ignored if `stacked` is set to true.
     */
    public yMin(min: number): this {
        return this.set('yMin', min);
    }

    /**
     * The requested maximum for the Y axis range. The value used at runtime may be different to optimize visual presentation. `yMax` is ignored if `stacked` is set to true.
     */
    public yMax(max: number): this {
        return this.set('yMax', max);
    }

    public getType(): string {
        return 'Chart.VerticalBar.Grouped';
    }
}
