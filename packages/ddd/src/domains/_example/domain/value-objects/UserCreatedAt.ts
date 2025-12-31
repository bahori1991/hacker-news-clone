import z from "zod";
import { ValueObject } from "@/libs/ValueObject";

export class UserCreatedAt extends ValueObject<Date, "UserCreatedAt"> {
  public static readonly schema = z.date();

  protected validate(value: Date): void {
    UserCreatedAt.schema.parse(value);
  }
}
