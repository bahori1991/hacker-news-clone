import { RFC9457Error } from "@packages/shared/RFC9457Error";

export class UserSignInFailedError extends RFC9457Error {
  public constructor(error: unknown) {
    super({
      type: "https://api/example.com/errors/user-signin-failed",
      detail: error instanceof Error ? error.message : "Something went wrong",
      title: "User signup failed",
      status: 400,
    });
  }
}
