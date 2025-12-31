import { ValueObject } from "@/libs/ValueObject";

export abstract class EntityId<T, B extends string> extends ValueObject<
  T,
  B,
  "EntityId"
> {}
