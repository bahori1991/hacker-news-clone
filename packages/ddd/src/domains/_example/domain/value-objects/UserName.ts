import z from "zod";
import { ValueObject } from "@/libs/ValueObject";

export class UserName extends ValueObject<string, "UserName"> {
  public static readonly schema = z.string().min(3).max(30);

  protected validate(value: string): void {
    UserName.schema.parse(value);
  }
}
