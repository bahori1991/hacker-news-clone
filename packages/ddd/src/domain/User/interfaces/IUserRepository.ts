import type { User } from "@packages/ddd/domain/User/User";
import type { UserEmail } from "@packages/ddd/domain/User/value-objects/UserEmail";
import type { UserId } from "@packages/ddd/domain/User/value-objects/UserId";

export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
}
