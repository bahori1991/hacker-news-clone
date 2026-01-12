import { RFC9457Error } from "@packages/shared/RFC9457Error";

export class UnauthorizedError extends RFC9457Error {
  public constructor() {
    super({
      type: "https://api/example.com/errors/unauthorized",
      detail: "Please sign in to continue",
      title: "Unauthorized",
      status: 401,
    });
  }
}
