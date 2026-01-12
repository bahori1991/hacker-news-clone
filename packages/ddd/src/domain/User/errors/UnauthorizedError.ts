import { RFC9457Error } from "@packages/shared/RFC9457Error";

export class UnauthorizedError extends RFC9457Error {
  public constructor() {
    super({
      message: "Please sign in to continue",
      code: "USER_NOT_LOGGED_IN",
      title: "Unauthorized",
      status: 401,
    });
  }
}
