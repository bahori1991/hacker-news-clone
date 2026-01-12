import { RFC9457Error } from "@packages/shared/RFC9457Error";

export class InternalServerError extends RFC9457Error {
  constructor() {
    super({
      message: "Something went wrong.",
      code: "INTERNAL_SERVER_ERROR",
      title: "Internal Server Error",
      status: 500,
    });
  }
}
