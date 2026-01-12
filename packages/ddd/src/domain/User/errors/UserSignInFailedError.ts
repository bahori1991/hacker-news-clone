import { RFC9457Error } from "@packages/shared/RFC9457Error";

export class UserSignInFailedError extends RFC9457Error {
  public constructor(error: unknown) {
    super({
      message: error instanceof Error ? error.message : "Something went wrong",
      code: "USER_SIGNIN_FAILED_ERROR",
      title: "User signup failed",
      status: 400,
    });
  }
}
