import { TargetWidth } from '../Enum/TargetWidth.ts';
import { Node } from '../Node.ts';
import { HasKey } from '../Support/HasKey.ts';

/**
 * Base class for responsive container layouts.
 */
export abstract class AbstractLayout extends Node {
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
     * Controls for which card width the layout should be used.
     * Valid values: "VeryNarrow", "Narrow", "Standard", "Wide",
     * "atLeast:VeryNarrow", "atMost:VeryNarrow", "atLeast:Narrow", "atMost:Narrow",
     * "atLeast:Standard", "atMost:Standard", "atLeast:Wide", "atMost:Wide".
     */
    public targetWidth(targetWidth: TargetWidth): this {
        return this.set('targetWidth', targetWidth);
    }
}
