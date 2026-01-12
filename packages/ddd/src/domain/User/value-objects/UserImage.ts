import { ValueObjectInvalidError } from "@packages/ddd/shared/errors/ValueObjectInvalidError";
import { ValueObject } from "@packages/ddd/shared/libs/ValueObject";

export class UserImage extends ValueObject<
  "UserImage",
  string | null | undefined
> {
  protected validate(
    value: string | null | undefined,
  ): string | null | undefined {
    if (typeof value === "string" && value.trim() === "") {
      throw new ValueObjectInvalidError(
        "Please set null or undefined if you don't set certain UserImage value",
      );
    }
    return value;
  }
}
