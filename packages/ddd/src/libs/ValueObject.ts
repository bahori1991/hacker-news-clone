import { isEqual } from "es-toolkit";
import { deepFreeze } from "./deepFreeze";

declare const brandSymbol: unique symbol;

type BrandedValue<T, B, C extends Category> = T & {
  readonly [brandSymbol]: B;
  readonly category: C;
};

type Category = "ValueObject" | "EntityId";

abstract class ValueObjectBase<T, B extends string, C extends Category> {
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

  public get value(): BrandedValue<T, B, C> {
    return this.#value as BrandedValue<T, B, C>;
  }

  public equals(other: this | null | undefined): boolean {
    if (this === other) return true;
    if (other === null || other === undefined) return false;
    if (typeof this !== typeof other) return false;
    return isEqual(this.value, other.value);
  }
}

export abstract class ValueObject<T, B extends string> extends ValueObjectBase<
  T,
  B,
  "ValueObject"
> {}

export abstract class EntityId<T, B extends string> extends ValueObjectBase<
  T,
  B,
  "EntityId"
> {}

export type ValueOf<V> =
  V extends ValueObjectBase<infer T, infer _B, infer _C> ? T : V;
