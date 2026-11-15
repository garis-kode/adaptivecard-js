import { Node } from '../Node.ts';
import { HasKey } from '../Support/HasKey.ts';

/**
 * Defines an area in a Layout.AreaGrid layout.
 */
export class GridArea extends Node {
    private readonly hasKey = new HasKey(this);

    public constructor(name: string | null = null) {
        super();
        if (name !== null) {
            this.name(name);
        }
    }

    public static make(name: string | null = null): GridArea {
        return new GridArea(name);
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
     * The name of the area. To place an element in this area, set its grid.area property to match the name of the area.
     */
    public name(name: string): this {
        return this.set('name', name);
    }

    /**
     * The start column index of the area. Column indices start at 1.
     */
    public column(column: number): this {
        return this.set('column', column);
    }

    /**
     * The start row index of the area. Row indices start at 1.
     */
    public row(row: number): this {
        return this.set('row', row);
    }

    /**
     * Defines how many columns the area should span.
     */
    public columnSpan(columnSpan: number): this {
        return this.set('columnSpan', columnSpan);
    }

    /**
     * Defines how many rows the area should span.
     */
    public rowSpan(rowSpan: number): this {
        return this.set('rowSpan', rowSpan);
    }

    public getType(): string | null {
        return null;
    }
}
