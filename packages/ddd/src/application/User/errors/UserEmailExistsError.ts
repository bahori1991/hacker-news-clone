import type { UserEmail } from "@packages/ddd/domain/User/value-objects/UserEmail";
import { RFC9457Error } from "@packages/shared/RFC9457Error";

export class UserEmailExistsError extends RFC9457Error {
  public constructor(email: UserEmail) {
    super({
      type: "https://api/example.com/errors/user-email-exists",
      detail: `User with email ${email.value} has already exists`,
      title: "Bad Request",
      status: 400,
    });
  }
}
