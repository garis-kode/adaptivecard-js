import type { AbstractAction } from "../Action/AbstractAction.js";
import { TextInputStyle } from "../Enum/TextInputStyle.js";
import { AbstractInput } from "./AbstractInput.js";

/**
 * An input to allow the user to enter text.
 */
export class TextInput extends AbstractInput {
  public constructor(
    id: string,
    label: string | null = null,
    placeholder: string | null = null,
  ) {
    super(id);
    if (label !== null) {
      this.label(label);
    }
    if (placeholder !== null) {
      this.placeholder(placeholder);
    }
  }

  public static make(
    id: string,
    label: string | null = null,
    placeholder: string | null = null,
  ): TextInput {
    return new TextInput(id, label, placeholder);
  }

  /**
   * The default value of the input.
   */
  public value(value: string): this {
    return this.set("value", value);
  }

  /**
   * The text to display as a placeholder when the user hasn't entered a value.
   */
  public placeholder(placeholder: string): this {
    return this.set("placeholder", placeholder);
  }

  /**
   * Controls if the input should allow multiple lines of text.
   */
  public isMultiline(multiline: boolean = true): this {
    return this.set("isMultiline", multiline);
  }

  /**
   * The maximum length of the text in the input.
   */
  public maxLength(maxLength: number): this {
    return this.set("maxLength", maxLength);
  }

  /**
   * The style of the input.
   * Valid values: "Text", "Tel", "Url", "Email", "Password".
   */
  public style(style: TextInputStyle): this {
    return this.set("style", style);
  }

  /**
   * The regular expression to validate the input.
   */
  public regex(regex: string): this {
    return this.set("regex", regex);
  }

  /**
   * The action that should be displayed as a button alongside the input.
   * Action.ShowCard is not supported.
   * Valid values: "Action.Execute", "Action.InsertImage", "Action.OpenUrl",
   * "Action.OpenUrlDialog", "Action.Popover", "Action.ResetInputs", "Action.RunCommands",
   * "Action.Submit", "Action.ToggleVisibility".
   */
  public inlineAction(action: AbstractAction): this {
    return this.set("inlineAction", action);
  }

  public getType(): string {
    return "Input.Text";
  }
}
