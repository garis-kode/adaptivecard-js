import { Node } from "../Node.js";
import type { HasKey } from "../Support/HasKey.js";
import { AuthCardButton } from "./AuthCardButton.js";
import type { TokenExchangeResource } from "./TokenExchangeResource.js";

/**
 * Defines authentication information associated with a card.
 */
export class Authentication extends Node implements HasKey {
  public static make(): Authentication {
    return new Authentication();
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
   * The text that can be displayed to the end user when prompting them to authenticate.
   */
  public text(text: string): this {
    return this.set("text", text);
  }

  /**
   * The identifier for registered OAuth connection setting information.
   */
  public connectionName(connectionName: string): this {
    return this.set("connectionName", connectionName);
  }

  /**
   * Provides information required to enable on-behalf-of single sign-on user authentication.
   * Valid values: "TokenExchangeResource".
   */
  public tokenExchangeResource(resource: TokenExchangeResource): this {
    return this.set("tokenExchangeResource", resource);
  }

  /**
   * Add buttons that should be displayed to the user when prompting for authentication. The array MUST
   * contain one button of type "signin". Other button types are not currently supported.
   */
  public addButtons(button: AuthCardButton | Iterable<AuthCardButton>): this {
    if (
      !(button instanceof AuthCardButton) &&
      Symbol.iterator in Object(button)
    ) {
      for (const item of button) {
        this.push("buttons", item);
      }

      return this;
    }

    return this.push("buttons", button);
  }

  /**
   * The buttons that should be displayed to the user when prompting for authentication.
   * The array MUST contain one button of type "signin". Other button types are not
   * currently supported.
   * Valid values: "AuthCardButton".
   */
  public buttons(buttons: Iterable<AuthCardButton>): this {
    return this.addButtons(buttons);
  }

  public getType(): string | null {
    return null;
  }
}
