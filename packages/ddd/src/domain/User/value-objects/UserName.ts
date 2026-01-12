import { ValueObject } from "@packages/ddd/shared/libs/ValueObject";

export class UserName extends ValueObject<"UserName", string> {
  protected validate(value: string): string {
    return value.trim();
  }
}
