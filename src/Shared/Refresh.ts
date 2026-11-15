import type { ExecuteAction } from "../Action/ExecuteAction.js";
import { Node } from "../Node.js";
import { HasKey } from "../Support/HasKey.js";

/**
 * Defines how a card can be refreshed by making a request to the target Bot.
 */
export class Refresh extends Node {
  private readonly hasKey = new HasKey(this);

  public static make(): Refresh {
    return new Refresh();
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
   * The `Action.Execute` action to invoke to refresh the card.
   * Valid values: "Action.Execute".
   */
  public action(action: ExecuteAction): this {
    return this.set("action", action);
  }

  /**
   * The list of user Ids for which the card will be automatically refreshed. In Teams,
   * in chats or channels with more than 60 users, the card will automatically refresh
   * only for users specified in the `userIds` list. Other users will have to manually
   * click on a "refresh" button. In contexts with fewer than 60 users, the card will
   * automatically refresh for all users.
   */
  public userIds(userIds: string[]): this {
    return this.set("userIds", userIds);
  }

  public getType(): string | null {
    return null;
  }
}
