import { ValueObjectInvalidError } from "@packages/ddd/shared/errors/ValueObjectInvalidError";
import { ValueObject } from "@packages/ddd/shared/libs/ValueObject";

export class UserId extends ValueObject<"UserId", string> {
  protected validate(value: string): string {
    const userId = value.trim();

    if (userId === "") {
      throw new ValueObjectInvalidError("UserId must not be empty");
    }

    return userId;
  }
}
