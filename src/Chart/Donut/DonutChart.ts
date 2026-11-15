import { ChartColor } from '../../Enum/ChartColor.ts';
import { ChartThickness } from '../../Enum/ChartThickness.ts';
import { AbstractChart } from '../AbstractChart.ts';
import { DonutChartData } from './DonutChartData.ts';

/**
 * A donut chart.
 */
export class DonutChart extends AbstractChart {
    public constructor(
        title: string,
        showTitle: boolean | null = null,
        data: Iterable<DonutChartData> | null = null,
    ) {
        super();
        this.title(title);

        if (showTitle !== null) {
            this.showTitle(showTitle);
        }
        if (data !== null) {
            this.data(data);
        }
    }

    public static make(
        title: string,
        showTitle: boolean | null = null,
        data: Iterable<DonutChartData> | null = null,
    ): DonutChart {
        return new DonutChart(title, showTitle, data);
    }

    /**
     * Controls whether the outlines of the donut segments are displayed.
     */
    public showOutlines(show: boolean = true): this {
        return this.set('showOutlines', show);
    }

    /**
     * Controls the thickness of the donut segments. Default is Thick.
     * Valid values: "Thin", "Thick".
     */
    public thickness(thickness: ChartThickness): this {
        return this.set('thickness', thickness);
    }

    /**
     * The value that should be displayed in the center of a Donut chart. `value` is
     * ignored for Pie charts.
     */
    public value(value: string | number): this {
        return this.set('value', value);
    }

    /**
     * Controls the color of the value displayed in the center of a Donut chart.
     */
    public valueColor(color: ChartColor): this {
        return this.set('valueColor', color);
    }

    /**
     * Add the data to display in the chart.
     */
    public addData(data: DonutChartData | Iterable<DonutChartData>): this {
        if (!(data instanceof DonutChartData) && Symbol.iterator in Object(data)) {
            for (const item of data) {
                this.push('data', item);
            }

            return this;
        }

        return this.push('data', data);
    }

    /**
     * The data to display in the chart.
     * Valid values: "DonutChartData".
     */
    public data(data: Iterable<DonutChartData>): this {
        return this.addData(data);
    }

    public getType(): string {
        return 'Chart.Donut';
    }
}
