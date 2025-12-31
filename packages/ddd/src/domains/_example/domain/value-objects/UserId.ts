import z from "zod";
import { EntityId } from "@/libs/EntityId";

export class UserId extends EntityId<string> {
  public static readonly schema = z.string();

  protected validate(value: string): void {
    UserId.schema.parse(value);
  }
}
