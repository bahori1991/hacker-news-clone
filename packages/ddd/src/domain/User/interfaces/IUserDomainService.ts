import type { UserEmail } from "@packages/ddd/domain/User/value-objects/UserEmail";
import type { UserId } from "@packages/ddd/domain/User/value-objects/UserId";

export interface IUserDomainService {
  userEmailExists(email: UserEmail, excludeUserId?: UserId): Promise<boolean>;
}
