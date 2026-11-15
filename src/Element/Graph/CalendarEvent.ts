import { AbstractGraphComponent } from './AbstractGraphComponent.ts';
import type { CalendarEventProperties } from './CalendarEventProperties.ts';

/**
 * Displays information about a calendar event.
 */
export class CalendarEvent extends AbstractGraphComponent {
    public static make(): CalendarEvent {
        return new CalendarEvent();
    }

    protected name(): string {
        return 'graph.microsoft.com/event';
    }

    /**
     * The properties of the event.
     * Valid values: "CalendarEventProperties".
     */
    public properties(properties: CalendarEventProperties): this {
        return this.set('properties', properties);
    }
}
