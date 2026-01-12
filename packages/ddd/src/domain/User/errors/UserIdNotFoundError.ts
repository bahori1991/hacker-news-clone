import type { UserId } from "@packages/ddd/domain/User/value-objects/UserId";
import { RFC9457Error } from "@packages/shared/RFC9457Error";

export class UserIdNotFoundError extends RFC9457Error {
  public constructor(userId?: UserId) {
    super({
      message: userId
        ? `User with id ${userId.value} not found`
        : "User not found",
      code: "USER_ID_NOT_FOUND_ERROR",
      title: "Not Found",
      status: 404,
    });
  }
}
