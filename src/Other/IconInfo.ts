import { Colors } from '../Enum/Colors.ts';
import { IconSize } from '../Enum/IconSize.ts';
import { IconStyle } from '../Enum/IconStyle.ts';
import { Node } from '../Node.ts';
import { HasKey } from '../Support/HasKey.ts';

/**
 * Defines information about a Fluent icon and how it should be rendered.
 */
export class IconInfo extends Node {
    private readonly hasKey = new HasKey(this);

    public constructor(
        name: string | null = null,
        color: Colors | null = null,
        size: IconSize | null = null,
        style: IconStyle | null = null,
    ) {
        super();
        if (name !== null) {
            this.name(name);
        }
        if (color !== null) {
            this.color(color);
        }
        if (size !== null) {
            this.size(size);
        }
        if (style !== null) {
            this.style(style);
        }
    }

    public static make(
        name: string | null = null,
        color: Colors | null = null,
        size: IconSize | null = null,
        style: IconStyle | null = null,
    ): IconInfo {
        return new IconInfo(name, color, size, style);
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
     * The color of the icon.
     * Valid values: "Default", "Dark", "Light", "Accent", "Good", "Warning", "Attention".
     */
    public color(color: Colors): this {
        return this.set('color', color);
    }

    /**
     * The name of the icon to display.
     */
    public name(name: string): this {
        return this.set('name', name);
    }

    /**
     * The size of the icon.
     * Valid values: "xxSmall", "xSmall", "Small", "Standard", "Medium", "Large", "xLarge", "xxLarge".
     */
    public size(size: IconSize): this {
        return this.set('size', size);
    }

    /**
     * The style of the icon.
     * Valid values: "Regular", "Filled".
     */
    public style(style: IconStyle): this {
        return this.set('style', style);
    }

    public getType(): string | null {
        return null;
    }
}
