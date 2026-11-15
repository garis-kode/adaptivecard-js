export abstract class Node {
  protected _properties: Record<string, unknown> = {};

  /**
   * Define an own enumerable property on a plain object without triggering
   * prototype setters (such as `__proto__`).
   */
  public static defineOwnProperty(
    target: Record<string, unknown>,
    key: string,
    value: unknown,
  ): void {
    Object.defineProperty(target, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  }

  /**
   * The Adaptive Card `type` discriminator (e.g. "TextBlock"). Type-less
   * objects such as Fact, Choice and BackgroundImage return null.
   */
  public abstract getType(): string | null;

  /**
   * Store a property unless the value is null or undefined (which means "leave as default").
   */
  protected set(key: string, value: unknown): this {
    if (value === null || value === undefined) {
      return this;
    }

    Node.defineOwnProperty(this._properties, key, value);

    return this;
  }

  /**
   * Append a value onto an array-valued property (e.g. body items, actions).
   */
  protected push(key: string, value: unknown): this {
    if (
      !Object.hasOwn(this._properties, key) ||
      !Array.isArray(this._properties[key])
    ) {
      Node.defineOwnProperty(this._properties, key, []);
    }

    (this._properties[key] as unknown[]).push(value);

    return this;
  }

  /**
   * Escape hatch for properties this library does not model explicitly,
   * and used by composed Support helpers.
   */
  public setProperty(key: string, value: unknown): this {
    return this.set(key, value);
  }

  /**
   * Append a value onto an array-valued property. Used by composed Support helpers.
   */
  public pushProperty(key: string, value: unknown): this {
    return this.push(key, value);
  }

  /**
   * Convert the node (and its children) to a plain nested object.
   */
  public toObject(): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    const type = this.getType();
    if (type !== null) {
      Node.defineOwnProperty(out, "type", type);
    }

    for (const [key, value] of Object.entries(this._properties)) {
      Node.defineOwnProperty(out, key, Node.normalize(value));
    }

    return out;
  }

  /**
   * Convert the node (and its children) to a plain nested object (PHP parity alias).
   */
  public toArray(): Record<string, unknown> {
    return this.toObject();
  }

  /**
   * Standard JavaScript JSON serialization hook (`JSON.stringify`).
   */
  public toJSON(): Record<string, unknown> {
    return this.toObject();
  }

  private static normalize(value: unknown): unknown {
    if (value instanceof Node) {
      return value.toObject();
    }

    if (Array.isArray(value)) {
      return value.map((item) => Node.normalize(item));
    }

    if (value !== null && typeof value === "object") {
      const normalizedObj: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value)) {
        Node.defineOwnProperty(normalizedObj, k, Node.normalize(v));
      }
      return normalizedObj;
    }

    return value;
  }
}
