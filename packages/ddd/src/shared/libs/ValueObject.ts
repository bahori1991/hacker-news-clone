import { deepFreeze } from "@packages/ddd/shared/utils/deepFreeze";
import type { Identify } from "@packages/shared/types";
import { isEqual } from "es-toolkit";

abstract class ValueObject<_N extends string, TInput, TOutput = TInput> {
  readonly #value: TOutput;

  public constructor(value: TInput) {
    const validatedValue = this.validate(value);
    this.#value = deepFreeze<TOutput>(validatedValue);
  }

  protected abstract validate(value: TInput): TOutput;

  public get value(): Identify<TOutput> {
    return this.#value as Identify<TOutput>;
  }

  public equals(other: this | null | undefined): boolean {
    if (this === other) return true;
    if (other === null || other === undefined) return false;
    if (this.constructor !== other.constructor) return false;
    return isEqual(this.value, other.value);
  }
}

type TypeOfInputValueObject<T> =
  T extends ValueObject<string, infer TInput, infer _TOutput>
    ? Identify<TInput>
    : never;

type TypeOfOutputValueObject<T> =
  T extends ValueObject<string, infer _TInput, infer TOutput>
    ? Identify<TOutput>
    : never;

type MappedInputValueObjects<T> = {
  [K in keyof T]: T[K] extends ValueObject<
    string,
    infer _TInput,
    infer _TOutput
  >
    ? TypeOfInputValueObject<T[K]>
    : T[K] extends
          | ValueObject<string, infer _TInput, infer _TOutput>
          | undefined
      ? TypeOfInputValueObject<NonNullable<T[K]>> | undefined
      : T[K];
};

type MappedOutputValueObjects<T> = {
  [K in keyof T]: T[K] extends ValueObject<
    string,
    infer _TInput,
    infer _TOutput
  >
    ? TypeOfOutputValueObject<T[K]>
    : T[K] extends
          | ValueObject<string, infer _TInput, infer _TOutput>
          | undefined
      ? TypeOfOutputValueObject<NonNullable<T[K]>> | undefined
      : T[K];
};

export {
  ValueObject,
  type TypeOfInputValueObject,
  type TypeOfOutputValueObject,
  type MappedInputValueObjects,
  type MappedOutputValueObjects,
};
