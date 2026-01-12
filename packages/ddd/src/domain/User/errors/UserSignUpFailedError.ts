import { RFC9457Error } from "@packages/shared/RFC9457Error";

export class UserSignUpFailedError extends RFC9457Error {
  public constructor(error: unknown) {
    super({
      message: error instanceof Error ? error.message : "Something went wrong",
      code: "USER_SIGNUP_FAILED_ERROR",
      title: "User signup failed",
      status: 400,
    });
  }
}
