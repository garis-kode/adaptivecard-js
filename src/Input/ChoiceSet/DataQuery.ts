import { AssociatedInputs } from "../../Enum/AssociatedInputs.js";
import { Node } from "../../Node.js";
import { HasKey } from "../../Support/HasKey.js";

/**
 * Defines a query to dynamically fetch data from a Bot.
 */
export class DataQuery extends Node {
  private readonly hasKey = new HasKey(this);

  public constructor(
    dataset: string | null = null,
    count: number | null = null,
    skip: number | null = null,
    associatedInputs: AssociatedInputs | null = null,
  ) {
    super();
    if (dataset !== null) {
      this.dataset(dataset);
    }
    if (count !== null) {
      this.count(count);
    }
    if (skip !== null) {
      this.skip(skip);
    }
    if (associatedInputs !== null) {
      this.associatedInputs(associatedInputs);
    }
  }

  public static make(
    dataset: string | null = null,
    count: number | null = null,
    skip: number | null = null,
    associatedInputs: AssociatedInputs | null = null,
  ): DataQuery {
    return new DataQuery(dataset, count, skip, associatedInputs);
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
   * The dataset from which to fetch the data.
   */
  public dataset(dataset: string): this {
    return this.set("dataset", dataset);
  }

  /**
   * The maximum number of data items that should be returned by the query.
   * Card authors should not specify this property in their card payload.
   * It is determined by the client and sent to the Bot to enable pagination.
   */
  public count(count: number): this {
    return this.set("count", count);
  }

  /**
   * The number of data items to be skipped by the query.
   * Card authors should not specify this property in their card payload.
   * It is determined by the client and sent to the Bot to enable pagination.
   */
  public skip(skip: number): this {
    return this.set("skip", skip);
  }

  /**
   * Controls which inputs are associated with the Data.Query. When a Data.Query
   * is executed, the values of the associated inputs are sent to the Bot, allowing
   * it to perform filtering operations based on the user's input.
   * Valid values: "auto", "none".
   */
  public associatedInputs(associatedInputs: AssociatedInputs): this {
    return this.set("associatedInputs", associatedInputs);
  }

  public getType(): string {
    return "Data.Query";
  }
}
