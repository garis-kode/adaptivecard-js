import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";
import type { TeamsSubmitActionDataInterface } from "./TeamsSubmitActionDataInterface.js";

/**
 * Represents Teams-specific data in an Action.Submit to open a task module.
 */
export class TaskFetchSubmitActionData
  extends Node
  implements TeamsSubmitActionDataInterface, HasKey
{
  public static make(): TaskFetchSubmitActionData {
    return new TaskFetchSubmitActionData();
  }

  /**
   * Defines an optional key for the object. Keys are seldom needed, but in
   * some scenarios, specifying keys can help maintain visual state in the
   * host application.
   */
  public key(key: string): this {
    return this.set("key", key);
  }

  public getType(): string {
    return "task/fetch";
  }
}
