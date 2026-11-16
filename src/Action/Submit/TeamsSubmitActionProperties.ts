import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";
import type { TeamsSubmitActionFeedback } from "./TeamsSubmitActionFeedback.js";

/**
 * Teams-specific properties associated with the action.
 */
export class TeamsSubmitActionProperties extends Node implements HasKey {
  public constructor(feedback: TeamsSubmitActionFeedback | null = null) {
    super();
    if (feedback !== null) {
      this.feedback(feedback);
    }
  }

  public static make(
    feedback: TeamsSubmitActionFeedback | null = null,
  ): TeamsSubmitActionProperties {
    return new TeamsSubmitActionProperties(feedback);
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
   * Defines how feedback is provided to the end-user when the action is executed.
   * Valid values: "TeamsSubmitActionFeedback".
   */
  public feedback(feedback: TeamsSubmitActionFeedback): this {
    return this.set("feedback", feedback);
  }

  public getType(): string | null {
    return null;
  }
}
