import z from "zod";
import { ValueObject } from "@/libs/ValueObject";

export class UserEmail extends ValueObject<string, "UserEmail"> {
  public static readonly schema = z.email();

  protected validate(value: string): void {
    UserEmail.schema.parse(value);
  }
}
