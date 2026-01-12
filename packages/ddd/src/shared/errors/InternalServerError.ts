import { RFC9457Error } from "@packages/shared/RFC9457Error";

export class InternalServerError extends RFC9457Error {
  constructor() {
    super({
      type: "https://api/example.com/errors/internal-server-error",
      title: "Internal Server Error",
      status: 500,
      detail: "Something went wrong.",
    });
  }
}
