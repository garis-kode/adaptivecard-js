import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";
import type { TeamsSubmitActionDataInterface } from "./TeamsSubmitActionDataInterface.js";

/**
 * Represents Teams-specific data in an Action.Submit to send an Instant Message back to the Bot.
 */
export class ImBackSubmitActionData
  extends Node
  implements TeamsSubmitActionDataInterface, HasKey
{
  public constructor(value: string | null = null) {
    super();
    if (value !== null) {
      this.value(value);
    }
  }

  public static make(value: string | null = null): ImBackSubmitActionData {
    return new ImBackSubmitActionData(value);
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
   * The value that will be sent to the Bot.
   */
  public value(value: string): this {
    return this.set("value", value);
  }

  public getType(): string {
    return "imBack";
  }
}
