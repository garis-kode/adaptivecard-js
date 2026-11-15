import { AbstractCartesianChart } from '../AbstractCartesianChart.ts';
import { StackedHorizontalBarChartData } from './StackedHorizontalBarChartData.ts';

/**
 * A stacked horizontal bar chart.
 */
export class StackedHorizontalBarChart extends AbstractCartesianChart {
    public constructor(
        title: string,
        data: Iterable<StackedHorizontalBarChartData>,
        showTitle: boolean | null = null,
    ) {
        super();
        this.title(title);
        this.data(data);

        if (showTitle !== null) {
            this.showTitle(showTitle);
        }
    }

    public static make(
        title: string,
        data: Iterable<StackedHorizontalBarChartData>,
        showTitle: boolean | null = null,
    ): StackedHorizontalBarChart {
        return new StackedHorizontalBarChart(title, data, showTitle);
    }

    /**
     * Add the data to display in the chart.
     */
    public addData(data: StackedHorizontalBarChartData | Iterable<StackedHorizontalBarChartData>): this {
        if (!(data instanceof StackedHorizontalBarChartData) && Symbol.iterator in Object(data)) {
            for (const item of data) {
                this.push('data', item);
            }

            return this;
        }

        return this.push('data', data);
    }

    /**
     * The data to display in the chart.
     * Valid values: "StackedHorizontalBarChartData".
     */
    public data(data: Iterable<StackedHorizontalBarChartData>): this {
        return this.addData(data);
    }

    public getType(): string {
        return 'Chart.HorizontalBar.Stacked';
    }
}
