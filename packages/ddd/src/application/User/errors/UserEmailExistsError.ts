import type { UserEmail } from "@packages/ddd/domain/User/value-objects/UserEmail";
import { RFC9457Error } from "@packages/shared/RFC9457Error";

export class UserEmailExistsError extends RFC9457Error {
  public constructor(email: UserEmail) {
    super({
      message: `User with email ${email.value} has already exists`,
      code: "USER_EMAIL_ALREADY_EXISTS",
      title: "Bad Request",
      status: 400,
    });
  }
}
