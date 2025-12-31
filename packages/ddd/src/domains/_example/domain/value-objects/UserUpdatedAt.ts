import z from "zod";
import { ValueObject } from "@/libs/ValueObject";

export class UserUpdatedAt extends ValueObject<Date, "UserUpdatedAt"> {
  public static readonly schema = z.date();

  protected validate(value: Date): void {
    UserUpdatedAt.schema.parse(value);
  }
}
