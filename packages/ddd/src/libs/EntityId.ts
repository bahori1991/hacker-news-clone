import { ValueObjectBase } from "@/libs/ValueObject.base";

export abstract class EntityId<T, B extends string> extends ValueObjectBase<
  T,
  B,
  "EntityId"
> {}
