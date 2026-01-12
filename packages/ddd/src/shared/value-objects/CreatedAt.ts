import { ValueObjectInvalidError } from "@packages/ddd/shared/errors/ValueObjectInvalidError";
import { ValueObject } from "@packages/ddd/shared/libs/ValueObject";
import { toISOStringWithTimeZone } from "@packages/ddd/shared/utils/isoStringWithTimeZone";

export class CreatedAt extends ValueObject<"CreatedAt", Date | string, string> {
  protected validate(value: Date | string): string {
    const date = typeof value === "string" ? new Date(value) : value;

    if (Number.isNaN(date.getTime())) {
      throw new ValueObjectInvalidError(
        "CreatedAt must be a valid Date Object or ISO 8601 format string.",
      );
    }
    return toISOStringWithTimeZone(date);
  }
}
