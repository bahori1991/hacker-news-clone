/** biome-ignore-all lint/suspicious/noExplicitAny: any is ok **/

import type { DataModelBuilder } from "@packages/ddd/shared/libs/DataModelBuilder";
import type {
  TypeOfInputValueObject,
  TypeOfOutputValueObject,
  ValueObject,
} from "@packages/ddd/shared/libs/ValueObject";
import type { Identify } from "@packages/shared/types";

type HasIdObject = {
  id: ValueObject<string, unknown>;
};

type TypeOfEntity<E> = E extends Entity<infer U> ? Identify<U> : never;

type UnpackInputTypeOfEntity<E> =
  E extends Entity<infer U>
    ? { [K in keyof U]: TypeOfInputValueObject<U[K]> }
    : never;

type UnpackOutputTypeOfEntity<E> =
  E extends Entity<infer U>
    ? { [K in keyof U]: TypeOfOutputValueObject<U[K]> }
    : never;

abstract class Entity<Props extends HasIdObject> {
  readonly #id: Props["id"];
  #props: Omit<Props, "id">;

  public constructor(props: Props) {
    const { id, ...rest } = props;
    this.#id = id;
    this.#props = rest;
  }

  public get id(): Props["id"] {
    return this.#id;
  }

  public toDataModel(builder: DataModelBuilder<this>): void {
    builder.setProps({ id: this.#id, ...this.#props } as TypeOfEntity<this>);
  }

  protected updateProps(props: Partial<Omit<Props, "id">>): void {
    this.#props = { ...this.#props, ...props };
  }

  public equals(other: this | null | undefined): boolean {
    if (this === other) return true;
    if (other === null || other === undefined) return false;
    if (this.constructor !== other.constructor) return false;
    return this.#id.equals(other.#id);
  }
}

export {
  Entity,
  type TypeOfEntity,
  type UnpackInputTypeOfEntity,
  type UnpackOutputTypeOfEntity,
};
