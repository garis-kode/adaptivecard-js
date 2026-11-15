/**
 * Base exception for all errors raised while building an Adaptive Card,
 * e.g. an invalid enum value or a malformed property.
 */
export class AdaptiveCardException extends Error {
  public constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "AdaptiveCardException";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
