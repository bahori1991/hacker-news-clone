import { ValueObjectInvalidError } from "@packages/ddd/shared/errors/ValueObjectInvalidError";
import { ValueObject } from "@packages/ddd/shared/libs/ValueObject";

export class UserEmail extends ValueObject<"UserEmail", string> {
  protected validate(value: string): string {
    const pattern = /^[a-z\d][\w.-]*@[\w.-]+\.[a-z\d]+$/i;

    if (!pattern.test(value)) {
      throw new ValueObjectInvalidError(
        `UserEmail must be valid email, but got "${value}"`,
      );
    }

    return value;
  }
}
