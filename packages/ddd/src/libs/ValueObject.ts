import { isEqual } from "es-toolkit";
import { deepFreeze } from "./deepFreeze";

// BrandedValue is a type that adds a brand to a value
declare const brandSymbol: unique symbol;
export type BrandedValue<T, B> = T & {
  readonly [brandSymbol]: B;
};

// ValueOf is a type that extracts the value type from a ValueObject
export type ValueOf<V> = V extends ValueObject<infer T, string> ? T : never;

// ValueObject is a base class for all value objects
export abstract class ValueObject<T, B extends string = string> {
  readonly #value: T;

  public constructor(value: T) {
    this.validate(value);

    if (typeof value !== "object" && value !== null) {
      this.#value = deepFreeze(value);
    } else {
      this.#value = value;
    }
  }

  protected abstract validate(value: T): void;

  public get value(): BrandedValue<T, B> {
    return this.#value as BrandedValue<T, B>;
  }

  public equals(other: this | null | undefined): boolean {
    if (this === other) return true;
    if (other === null || other === undefined) return false;
    if (typeof this !== typeof other) return false;
    return isEqual(this.value, other.value);
  }
}
