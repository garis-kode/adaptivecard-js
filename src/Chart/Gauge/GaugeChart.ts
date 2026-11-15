import { GaugeValueFormat } from '../../Enum/GaugeValueFormat.ts';
import { AbstractChart } from '../AbstractChart.ts';
import { GaugeChartLegend } from './GaugeChartLegend.ts';

/**
 * A gauge chart.
 */
export class GaugeChart extends AbstractChart {
    public constructor(
        title: string,
        showTitle: boolean | null = null,
        value: number | null = null,
        segments: Iterable<GaugeChartLegend> | null = null,
    ) {
        super();
        this.title(title);

        if (showTitle !== null) {
            this.showTitle(showTitle);
        }
        if (value !== null) {
            this.value(value);
        }
        if (segments !== null) {
            this.segments(segments);
        }
    }

    public static make(
        title: string,
        showTitle: boolean | null = null,
        value: number | null = null,
        segments: Iterable<GaugeChartLegend> | null = null,
    ): GaugeChart {
        return new GaugeChart(title, showTitle, value, segments);
    }

    /**
     * The value of the gauge.
     */
    public value(value: number): this {
        return this.set('value', value);
    }

    /**
     * The minimum value of the gauge.
     */
    public min(min: number): this {
        return this.set('min', min);
    }

    /**
     * The maximum value of the gauge.
     */
    public max(max: number): this {
        return this.set('max', max);
    }

    /**
     * Add the segments to display in the gauge.
     */
    public addSegments(segment: GaugeChartLegend | Iterable<GaugeChartLegend>): this {
        if (!(segment instanceof GaugeChartLegend) && Symbol.iterator in Object(segment)) {
            for (const item of segment) {
                this.push('segments', item);
            }

            return this;
        }

        return this.push('segments', segment);
    }

    /**
     * Add a legend to the gauge chart.
     */
    public addLegends(legend: GaugeChartLegend | Iterable<GaugeChartLegend>): this {
        return this.addSegments(legend);
    }

    /**
     * The segments to display in the gauge.
     * Valid values: "GaugeChartLegend".
     */
    public segments(segments: Iterable<GaugeChartLegend>): this {
        return this.addSegments(segments);
    }

    /**
     * Controls whether the min/max values should be displayed.
     */
    public showMinMax(show: boolean = true): this {
        return this.set('showMinMax', show);
    }

    /**
     * Controls whether the gauge's needle is displayed. Default is true.
     */
    public showNeedle(show: boolean = true): this {
        return this.set('showNeedle', show);
    }

    /**
     * Controls whether the outlines of the gauge segments are displayed.
     */
    public showOutlines(show: boolean = true): this {
        return this.set('showOutlines', show);
    }

    /**
     * The sub-label of the gauge.
     */
    public subLabel(subLabel: string): this {
        return this.set('subLabel', subLabel);
    }

    /**
     * The format used to display the gauge's value.
     * Valid values: "Percentage", "Fraction".
     */
    public valueFormat(format: GaugeValueFormat): this {
        return this.set('valueFormat', format);
    }

    public getType(): string {
        return 'Chart.Gauge';
    }
}
