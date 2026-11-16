import { PersonaIconStyle } from "../../Enum/PersonaIconStyle.js";
import { PersonaStyle } from "../../Enum/PersonaStyle.js";
import { Node } from "../../Node.js";
import type { HasKey } from "../../Support/HasKey.js";
import { PersonaProperties } from "./PersonaProperties.js";

/**
 * Represents the properties of a PersonaSet component.
 */
export class PersonaSetProperties extends Node implements HasKey {
  public static make(): PersonaSetProperties {
    return new PersonaSetProperties();
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
   * Defines the style of the icon for the personas in the set.
   * Valid values: "profilePicture", "contactCard", "none".
   */
  public iconStyle(iconStyle: PersonaIconStyle): this {
    return this.set("iconStyle", iconStyle);
  }

  /**
   * Defines how each persona in the set should be displayed.
   * Valid values: "iconAndName", "iconOnly", "nameOnly".
   */
  public style(style: PersonaStyle): this {
    return this.set("style", style);
  }

  /**
   * Add the users a PersonaSet component should display.
   */
  public addUsers(user: PersonaProperties | Iterable<PersonaProperties>): this {
    if (
      !(user instanceof PersonaProperties) &&
      Symbol.iterator in Object(user)
    ) {
      for (const item of user) {
        this.push("users", item);
      }

      return this;
    }

    return this.push("users", user);
  }

  public getType(): string | null {
    return null;
  }
}
