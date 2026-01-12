import { ValueObject } from "@packages/ddd/shared/libs/ValueObject";

export class UserEmailVerified extends ValueObject<
  "UserEmailVerified",
  boolean
> {
  protected validate(value: boolean): boolean {
    return value;
  }
}
