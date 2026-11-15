import { Node } from '../Node.ts';
import { HasKey } from '../Support/HasKey.ts';
import type { AbstractElement } from './AbstractElement.ts';

export abstract class AbstractInlineElement extends Node {
    private readonly hasKey = new HasKey(this);

    /**
     * Defines an optional key for the object. Keys are seldom needed, but in
     * some scenarios, specifying keys can help maintain visual state in the
     * host application.
     */
    public key(key: string): this {
        return this.hasKey.key(key);
    }

    /**
     * A unique identifier for the element or action. Input elements must have
     * an `id`, otherwise they will not be validated and their values will not
     * be sent to the Bot.
     */
    public id(id: string): this {
        return this.set('id', id);
    }

    /**
     * Controls the visibility of the element.
     */
    public isVisible(visible: boolean = true): this {
        return this.set('isVisible', visible);
    }

    /**
     * Defines an expression whose evaluated value will be used to update the
     * `isVisible` property of the element at runtime.
     */
    public isVisibleDynamic(expression: string): this {
        return this.set('isVisible.dynamic', expression);
    }

    /**
     * The area of a `Layout.AreaGrid` layout in which an element should be displayed.
     */
    public gridArea(gridArea: string): this {
        return this.set('grid.area', gridArea);
    }

    /**
     * Controls whether the element should be used as a sort key by elements
     * that allow sorting across a collection of elements.
     */
    public isSortKey(isSortKey: boolean = true): this {
        return this.set('isSortKey', isSortKey);
    }

    /**
     * The locale associated with the element.
     */
    public lang(lang: string): this {
        return this.set('lang', lang);
    }

    /**
     * An alternate element to render if the type of this one is unsupported or
     * if the host application doesn't support all the capabilities specified in
     * the `requires` property.
     * Valid values: "Container", "ActionSet", "ColumnSet", "Media", "RichTextBlock", "Table",
     * "TextBlock", "FactSet", "ImageSet", "Image", "Input.Text", "Input.Date", "Input.Time",
     * "Input.Number", "Input.Toggle", "Input.ChoiceSet", "Input.Rating", "Rating", "CompoundButton",
     * "Icon", "Carousel", "TabSet", "Accordion", "Badge", "ProgressRing", "ProgressBar",
     * "LoopComponent", "Chart.Donut", "Chart.Pie", "Chart.VerticalBar.Grouped", "Chart.VerticalBar",
     * "Chart.HorizontalBar", "Chart.HorizontalBar.Stacked", "Chart.Line", "Chart.Gauge",
     * "CodeBlock", "Persona", "PersonaSet", "Graph resource", "File", "Calendar event", "drop".
     */
    public fallback(fallback: string | AbstractElement): this {
        return this.set('fallback', fallback);
    }
}
