import type { AbstractBlockElement } from '../Element/AbstractBlockElement.ts';
import type { AbstractInlineElement } from '../Element/AbstractInlineElement.ts';
import { PopoverPosition } from '../Enum/PopoverPosition.ts';
import { AbstractAction } from './AbstractAction.ts';

/**
 * Shows a popover to display more information to the user.
 */
export class PopoverAction extends AbstractAction {
    public constructor(title: string | null = null) {
        super();
        if (title !== null) {
            this.title(title);
        }
    }

    public static make(title: string | null = null): PopoverAction {
        return new PopoverAction(title);
    }

    /**
     * The content of the popover, which can be any element.
     * Valid values: "Accordion", "ActionSet", "Badge", "Carousel", "Chart.Donut", "Chart.Gauge",
     * "Chart.HorizontalBar", "Chart.HorizontalBar.Stacked", "Chart.Line", "Chart.Pie",
     * "Chart.VerticalBar", "Chart.VerticalBar.Grouped", "CitationRun", "CodeBlock", "ColumnSet",
     * "Calendar event", "File", "Graph resource", "Persona", "PersonaSet", "CompoundButton",
     * "Container", "FactSet", "Icon", "IconRun", "Image", "ImageRun", "ImageSet", "Input.ChoiceSet",
     * "Input.Date", "Input.Number", "Input.Rating", "Input.Text", "Input.Time", "Input.Toggle",
     * "LoopComponent", "Media", "ProgressBar", "ProgressRing", "Rating", "RichTextBlock", "Table",
     * "TabSet", "TextBlock", "TextRun".
     */
    public content(content: AbstractBlockElement | AbstractInlineElement): this {
        return this.set('content', content);
    }

    /**
     * Controls where the popover should be displayed with regards to the element that triggered it.
     * Valid values: "Above", "Below", "Before", "After".
     */
    public position(position: PopoverPosition): this {
        return this.set('position', position);
    }

    /**
     * Controls if an arrow should be displayed towards the element that triggered the popover.
     */
    public displayArrow(displayArrow: boolean = true): this {
        return this.set('displayArrow', displayArrow);
    }

    /**
     * The maximum width of the popover in pixels, in the `<number>px` format.
     * Valid values: "<number>px".
     */
    public maxPopoverWidth(maxPopoverWidth: string): this {
        return this.set('maxPopoverWidth', maxPopoverWidth);
    }

    /**
     * The optional title of the popover, which will only be displayed on mobile devices.
     */
    public popoverTitle(popoverTitle: string): this {
        return this.set('popoverTitle', popoverTitle);
    }

    public getType(): string {
        return 'Action.Popover';
    }
}
