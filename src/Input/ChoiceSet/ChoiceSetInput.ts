import { ChoiceInputStyle } from '../../Enum/ChoiceInputStyle.ts';
import { AbstractInput } from '../AbstractInput.ts';
import { Choice } from './Choice.ts';
import type { DataQuery } from './DataQuery.ts';

/**
 * An input to allow the user to select one or more values.
 */
export class ChoiceSetInput extends AbstractInput {
    public static make(id: string): ChoiceSetInput {
        return new ChoiceSetInput(id);
    }

    /**
     * The default value of the input.
     */
    public value(value: string): this {
        return this.set('value', value);
    }

    /**
     * Add the choices associated with the input.
     */
    public addChoices(choice: Choice | Iterable<Choice>): this {
        if (!(choice instanceof Choice) && Symbol.iterator in Object(choice)) {
            for (const item of choice) {
                this.push('choices', item);
            }

            return this;
        }

        return this.push('choices', choice);
    }

    /**
     * Add a choice with title and value.
     */
    public choice(title: string, value: string): this {
        return this.addChoices(new Choice(title, value));
    }

    /**
     * The choices associated with the input.
     * Valid values: "Choice".
     */
    public choices(choices: Iterable<Choice>): this {
        return this.addChoices(choices);
    }

    /**
     * Controls whether multiple choices can be selected.
     */
    public isMultiSelect(multiSelect: boolean = true): this {
        return this.set('isMultiSelect', multiSelect);
    }

    /**
     * Controls whether the input should be displayed as a dropdown (compact) or a list
     * of radio buttons or checkboxes (expanded).
     * Valid values: "compact", "expanded", "filtered".
     */
    public style(style: ChoiceInputStyle): this {
        return this.set('style', style);
    }

    /**
     * The text to display as a placeholder when the user has not entered any value.
     */
    public placeholder(placeholder: string): this {
        return this.set('placeholder', placeholder);
    }

    /**
     * Controls if choice titles should wrap.
     */
    public wrap(wrap: boolean = true): this {
        return this.set('wrap', wrap);
    }

    /**
     * The minimum width, in pixels, for each column when using a multi-column layout. This ensures
     * that choice items remain readable even when horizontal space is limited. Default is 100 pixels.
     * Valid values: "<number>px".
     */
    public minColumnWidth(width: string): this {
        return this.set('minColumnWidth', width);
    }

    /**
     * Controls whether choice items are arranged in multiple columns in expanded mode, or in a
     * single column. Default is false.
     */
    public useMultipleColumns(multiple: boolean = true): this {
        return this.set('useMultipleColumns', multiple);
    }

    /**
     * A Data.Query object that defines the dataset from which to dynamically fetch the choices
     * for the input.
     * Valid values: "Data.Query".
     */
    public dataQuery(dataQuery: DataQuery): this {
        return this.set('choices.data', dataQuery);
    }

    public getType(): string {
        return 'Input.ChoiceSet';
    }
}
