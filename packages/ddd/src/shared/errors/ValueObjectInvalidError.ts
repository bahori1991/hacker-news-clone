import { RFC9457Error } from "@packages/shared/RFC9457Error";

export class ValueObjectInvalidError extends RFC9457Error {
  public constructor(message: string) {
    super({
      message,
      code: "VALUE_OBJECT_INVALID_ERROR",
      title: "Bad Request",
      status: 400,
    });
  }
}
