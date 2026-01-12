import type {
  TypeOfEntity,
  UnpackOutputTypeOfEntity,
} from "@packages/ddd/shared/libs/Entity";
import { ValueObject } from "@packages/ddd/shared/libs/ValueObject";

export class DataModelBuilder<Entity> {
  #props?: TypeOfEntity<Entity>;

  public setProps(props: TypeOfEntity<Entity>): void {
    this.#props = props;
  }

  public build(): UnpackOutputTypeOfEntity<Entity> {
    if (this.#props === undefined) {
      throw new Error(
        "DataModelBuilder is not fullfilled. Please execute this.setProps() before building.",
      );
    }
    const result = {} as Record<string, unknown>;

    for (const key of Object.keys(this.#props) as Array<
      keyof TypeOfEntity<Entity>
    >) {
      const item = this.#props[key];

      if (typeof key === "string") {
        if (item instanceof ValueObject) {
          result[key] = item.value;
        } else {
          result[key] = item;
        }
      }
    }

    return result as UnpackOutputTypeOfEntity<Entity>;
  }
}
