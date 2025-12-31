import z from "zod";
import { ValueObject } from "@/libs/ValueObject";

export class UserPassword extends ValueObject<string, "UserPassword"> {
  public static readonly schema = z.string().min(8).max(30);

  protected validate(value: string): void {
    UserPassword.schema.parse(value);
  }
}
