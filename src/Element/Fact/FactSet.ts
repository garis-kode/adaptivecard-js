import { Height } from "../../Enum/Height.js";
import { Spacing } from "../../Enum/Spacing.js";
import { HasHeight } from "../../Support/HasHeight.js";
import { HasSpacing } from "../../Support/HasSpacing.js";
import { AbstractBlockElement } from "../AbstractBlockElement.js";
import { Fact } from "./Fact.js";

/**
 * A set of facts, displayed as a table or a vertical list when horizontal space is constrained.
 */
export class FactSet extends AbstractBlockElement {
  private readonly hasHeight = new HasHeight(this);
  private readonly hasSpacing = new HasSpacing(this);

  public static make(): FactSet {
    return new FactSet();
  }

  /**
   * Controls how the element should be vertically sized.
   * Valid values: "auto", "stretch".
   */
  public height(height: Height): this {
    return this.hasHeight.height(height);
  }

  /**
   * Controls the amount of space between this element and the preceding one.
   * Valid values: "none", "extraSmall", "small", "default", "medium", "large", "extraLarge", "padding".
   */
  public spacing(spacing: Spacing): this {
    return this.hasSpacing.spacing(spacing);
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
