import { ValueObjectInvalidError } from "@packages/ddd/shared/errors/ValueObjectInvalidError";
import { ValueObject } from "@packages/ddd/shared/libs/ValueObject";

export class UserEmail extends ValueObject<"UserEmail", string> {
  public static readonly constraints = {
    pattern: /^[a-z\d][\w.-]*@[\w.-]+\.[a-z\d]+$/i,
  } as const;

  protected validate(value: string): string {
    if (!UserEmail.constraints.pattern.test(value)) {
      throw new ValueObjectInvalidError(
        `UserEmail must be valid email, but got "${value}"`,
      );
    }

    return value;
  }
}
