import { HorizontalAlignment } from '../Enum/HorizontalAlignment.ts';
import { ItemFit } from '../Enum/ItemFit.ts';
import { Spacing } from '../Enum/Spacing.ts';
import { VerticalAlignment } from '../Enum/VerticalAlignment.ts';
import { AbstractLayout } from './AbstractLayout.ts';

/**
 * Flow layout: wraps child elements horizontally across rows.
 */
export class FlowLayout extends AbstractLayout {
    public static make(): FlowLayout {
        return new FlowLayout();
    }

    /**
     * The width, in pixels, of each item, in the `<number>px` format. Should not be used if `maxItemWidth`
     * and/or `minItemWidth` are set.
     * Valid values: "<number>px".
     */
    public itemWidth(itemWidth: string): this {
        return this.set('itemWidth', itemWidth);
    }

    /**
     * Controls how item should fit inside the container.
     * Valid values: "Fit", "Fill".
     */
    public itemFit(itemFit: ItemFit): this {
        return this.set('itemFit', itemFit);
    }

    /**
     * The minimum width, in pixels, of each item, in the `<number>px` format. Should not be used if
     * `itemWidth` is set.
     * Valid values: "<number>px".
     */
    public minItemWidth(minItemWidth: string): this {
        return this.set('minItemWidth', minItemWidth);
    }

    /**
     * The maximum width, in pixels, of each item, in the `<number>px` format. Should not be used if
     * `itemWidth` is set.
     * Valid values: "<number>px".
     */
    public maxItemWidth(maxItemWidth: string): this {
        return this.set('maxItemWidth', maxItemWidth);
    }

    /**
     * The space between items.
     * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
     */
    public columnSpacing(spacing: Spacing): this {
        return this.set('columnSpacing', spacing);
    }

    /**
     * The space between rows of items.
     * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
     */
    public rowSpacing(spacing: Spacing): this {
        return this.set('rowSpacing', spacing);
    }

    /**
     * Controls how the content of the container should be horizontally aligned.
     * Valid values: "Left", "Center", "Right".
     */
    public horizontalItemsAlignment(alignment: HorizontalAlignment): this {
        return this.set('horizontalItemsAlignment', alignment);
    }

    /**
     * Controls how the content of the container should be vertically aligned.
     * Valid values: "Top", "Center", "Bottom".
     */
    public verticalItemsAlignment(alignment: VerticalAlignment): this {
        return this.set('verticalItemsAlignment', alignment);
    }

    public getType(): string {
        return 'Layout.Flow';
    }
}
