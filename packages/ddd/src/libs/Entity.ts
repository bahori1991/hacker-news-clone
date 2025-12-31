import type { EntityId } from "@/libs/EntityId";
import type { ValueOf } from "@/libs/ValueObject";

export interface EntityProps<I extends EntityId<unknown> = EntityId<unknown>> {
  id: I;
}

export type ValueOfEntityProps<P extends EntityProps> = {
  [K in keyof P]: ValueOf<P[K]>;
};

export abstract class Entity<P extends EntityProps> {
  readonly #id: P["id"];
  #props: Omit<P, "id">;

  public constructor(props: P) {
    const { id, ...rest } = props;
    this.#id = id;
    this.#props = rest;
  }

  public get id(): P["id"] {
    return this.#id;
  }

  public get props(): Readonly<P> {
    return {
      id: this.#id,
      ...this.#props,
    } as Readonly<P>;
  }

  protected changeProps(props: Partial<Omit<P, "id">>): void {
    this.#props = { ...this.#props, ...props };
  }

  public equals(other: this | null | undefined): boolean {
    if (this === other) return true;
    if (other === null || other === undefined) return false;
    if (typeof this !== typeof other) return false;
    return this.#id.equals(other.#id);
  }
}
