import { Node } from "../../Node.js";
import { HasKey } from "../../Support/HasKey.js";
import type { CollabStageInvokeDataValue } from "./CollabStageInvokeDataValue.js";
import type { TeamsSubmitActionDataInterface } from "./TeamsSubmitActionDataInterface.js";

/**
 * Represents Teams-specific data in an Action.Submit to make an Invoke request to the Bot.
 */
export class InvokeSubmitActionData
  extends Node
  implements TeamsSubmitActionDataInterface
{
  private readonly hasKey = new HasKey(this);

  public constructor(
    value: CollabStageInvokeDataValue | string | number | boolean | null = null,
  ) {
    super();
    if (value !== null) {
      this.value(value);
    }
  }

  public static make(
    value: CollabStageInvokeDataValue | string | number | boolean | null = null,
  ): InvokeSubmitActionData {
    return new InvokeSubmitActionData(value);
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
   * The object to send to the Bot with the Invoke request. Can be strongly typed as
   * one of the below values to trigger a specific action in Teams.
   * Valid values: "CollabStageInvokeDataValue".
   */
  public value(
    value: CollabStageInvokeDataValue | string | number | boolean,
  ): this {
    return this.set("value", value);
  }

  public getType(): string {
    return "invoke";
  }
}
