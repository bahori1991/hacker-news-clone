import { ValueObject } from "@packages/ddd/shared/libs/ValueObject";

export class UserPassword extends ValueObject<"UserPassword", string> {
  protected validate(value: string): string {
    return value.trim();
  }
}
