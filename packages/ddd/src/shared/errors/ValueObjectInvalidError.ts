import { RFC9457Error } from "@packages/shared/RFC9457Error";

export type CustomError = {
  key: string;
  detail: string;
};

export class ValueObjectInvalidError extends RFC9457Error {
  public constructor(message: string, errors?: CustomError[]) {
    super({
      type: "https://api/example.com/errors/value-object-invalid",
      title: "Bad Request",
      detail: message,
      status: 400,
      custom: { errors: errors ?? [] },
    });
  }
}
