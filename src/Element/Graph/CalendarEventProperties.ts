import { Node } from "../../Node.js";
import { HasKey } from "../../Support/HasKey.js";
import { CalendarEventAttendee } from "./CalendarEventAttendee.js";

/**
 * The properties of a calendar event.
 */
export class CalendarEventProperties extends Node {
  private readonly hasKey = new HasKey(this);

  public static make(): CalendarEventProperties {
    return new CalendarEventProperties();
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
   * Add attendees to the event.
   */
  public addAttendees(
    attendee: CalendarEventAttendee | Iterable<CalendarEventAttendee>,
  ): this {
    if (
      !(attendee instanceof CalendarEventAttendee) &&
      Symbol.iterator in Object(attendee)
    ) {
      for (const item of attendee) {
        this.push("attendees", item);
      }

      return this;
    }

    return this.push("attendees", attendee);
  }

  /**
   * The end date and time of the event.
   */
  public end(end: string): this {
    return this.set("end", end);
  }

  /**
   * The extension of the event.
   */
  public extension(extension: string): this {
    return this.set("extension", extension);
  }

  /**
   * The ID of the event.
   */
  public id(id: string): this {
    return this.set("id", id);
  }

  /**
   * Indicates if the event is all day.
   */
  public isAllDay(isAllDay: boolean = true): this {
    return this.set("isAllDay", isAllDay);
  }

  /**
   * Add locations to the event.
   */
  public addLocations(location: string | Iterable<string>): this {
    if (typeof location !== "string" && Symbol.iterator in Object(location)) {
      for (const item of location) {
        this.push("locations", item);
      }

      return this;
    }

    return this.push("locations", location);
  }

  /**
   * The URL of the online meeting.
   */
  public onlineMeetingUrl(onlineMeetingUrl: string): this {
    return this.set("onlineMeetingUrl", onlineMeetingUrl);
  }

  /**
   * The organizer of the event.
   * Valid values: "CalendarEventAttendee".
   */
  public organizer(organizer: CalendarEventAttendee): this {
    return this.set("organizer", organizer);
  }

  /**
   * The start date and time of the event.
   */
  public start(start: string): this {
    return this.set("start", start);
  }

  /**
   * The status of the event.
   */
  public status(status: string): this {
    return this.set("status", status);
  }

  /**
   * The title of the event.
   */
  public title(title: string): this {
    return this.set("title", title);
  }

  /**
   * The URL of the event.
   */
  public url(url: string): this {
    return this.set("url", url);
  }

  public getType(): string | null {
    return null;
  }
}
