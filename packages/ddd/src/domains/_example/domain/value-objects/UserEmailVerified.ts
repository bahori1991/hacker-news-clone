import z from "zod";
import { ValueObject } from "@/libs/ValueObject";

export class UserEmailVerified extends ValueObject<
  boolean,
  "UserEmailVerified"
> {
  public static readonly schema = z.boolean();

  protected validate(value: boolean): void {
    UserEmailVerified.schema.parse(value);
  }
}
