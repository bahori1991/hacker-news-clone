import z from "zod";
import { ValueObject } from "@/libs/ValueObject";

export class UserImage extends ValueObject<
  string | null | undefined,
  "UserImage"
> {
  public static readonly schema = z.url().nullable().optional();

  protected validate(value: string | null | undefined): void {
    UserImage.schema.parse(value);
  }
}
