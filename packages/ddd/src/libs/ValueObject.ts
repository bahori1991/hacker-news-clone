import { ValueObjectBase } from "@/libs/ValueObject.base";

export abstract class ValueObject<T, B extends string> extends ValueObjectBase<
  T,
  B,
  "ValueObject"
> {}
