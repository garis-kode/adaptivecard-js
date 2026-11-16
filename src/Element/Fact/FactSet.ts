import { Height } from "../../Enum/Height.js";
import { Spacing } from "../../Enum/Spacing.js";
import type { HasHeight } from "../../Support/HasHeight.js";
import type { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";
import { Fact } from "./Fact.js";

/**
 * A set of facts, displayed as a table or a vertical list when horizontal space is constrained.
 */
export class FactSet
  extends AbstractBlockElement
  implements HasHeight, HasSpacing
{
  public static make(): FactSet {
    return new FactSet();
  }

  /**
   * The height of the element. When set to `stretch`, the element will use
   * the remaining vertical space in its container.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.set("height", height);
  }

  /**
   * Controls the amount of space between this element and the previous one.
   * No space will be added for the first element in a container.
   * Valid values: "None", "ExtraSmall", "Small", "Default", "Medium", "Large", "ExtraLarge", "Padding".
   */
  public spacing(spacing: Spacing): this {
    return this.set("spacing", spacing);
  }

  /**
   * Add a Fact to the set.
   */
  public addFacts(fact: Fact | Iterable<Fact>): this {
    if (!(fact instanceof Fact) && Symbol.iterator in Object(fact)) {
      for (const item of fact) {
        this.push("facts", item);
      }

      return this;
    }

    return this.push("facts", fact);
  }

  /**
   * Add a Fact from a title and value.
   */
  public fact(title: string, value: string): this {
    return this.addFacts(new Fact(title, value));
  }

  /**
   * The facts in the set.
   * Valid values: "Fact".
   */
  public facts(facts: Iterable<Fact>): this {
    return this.addFacts(facts);
  }

  public getType(): string {
    return "FactSet";
  }
}
