import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";

/**
 * Represents a calendar event attendee.
 */
export class CalendarEventAttendee extends Node implements HasKey {
  public static make(): CalendarEventAttendee {
    return new CalendarEventAttendee();
  }

  /**
   * Defines an optional key for the object. Keys are seldom needed, but in
   * some scenarios, specifying keys can help maintain visual state in the
   * host application.
   */
  public key(key: string): this {
    return this.set("key", key);
  }

  /**
   * The type of the attendee.
   */
  public type(type: string): this {
    return this.set("type", type);
  }

  /**
   * The email address of the attendee.
   */
  public email(email: string): this {
    return this.set("email", email);
  }

  /**
   * The name of the attendee.
   */
  public name(name: string): this {
    return this.set("name", name);
  }

  /**
   * The status of the attendee.
   */
  public status(status: string): this {
    return this.set("status", status);
  }

  /**
   * The title of the attendee.
   */
  public title(title: string): this {
    return this.set("title", title);
  }

  public getType(): string | null {
    return null;
  }
}
