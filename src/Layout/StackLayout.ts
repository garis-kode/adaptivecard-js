import { AbstractLayout } from './AbstractLayout.ts';

/**
 * Stack layout: displays elements vertically or horizontally in order.
 */
export class StackLayout extends AbstractLayout {
    public static make(): StackLayout {
        return new StackLayout();
    }

    public getType(): string {
        return 'Layout.Stack';
    }
}
