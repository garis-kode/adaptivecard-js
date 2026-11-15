import { AbstractInput } from './AbstractInput.ts';

/**
 * An input to allow the user to select a date.
 */
export class DateInput extends AbstractInput {
    public constructor(id: string, label: string | null = null) {
        super(id);

        if (label !== null) {
            this.label(label);
        }
    }

    public static make(id: string, label: string | null = null): DateInput {
        return new DateInput(id, label);
    }

    /**
     * The default value of the input, in the `YYYY-MM-DD` format.
     */
    public value(value: string): this {
        return this.set('value', value);
    }

    /**
     * The text to display as a placeholder when the user has not selected a date.
     */
    public placeholder(placeholder: string): this {
        return this.set('placeholder', placeholder);
    }

    /**
     * The minimum date that can be selected.
     */
    public min(min: string): this {
        return this.set('min', min);
    }

    /**
     * The maximum date that can be selected.
     */
    public max(max: string): this {
        return this.set('max', max);
    }

    public getType(): string {
        return 'Input.Date';
    }
}
