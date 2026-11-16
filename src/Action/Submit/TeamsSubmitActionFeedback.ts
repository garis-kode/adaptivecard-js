import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";

/**
 * Represents feedback options for an Action.Submit.
 */
export class TeamsSubmitActionFeedback extends Node implements HasKey {
  public constructor(hide: boolean | null = null) {
    super();
    if (hide !== null) {
      this.hide(hide);
    }
  }

  public static make(hide: boolean | null = null): TeamsSubmitActionFeedback {
    return new TeamsSubmitActionFeedback(hide);
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
   * Defines if a feedback message should be displayed after the action is executed.
   */
  public hide(hide: boolean = true): this {
    return this.set("hide", hide);
  }

  public getType(): string | null {
    return null;
  }
}
