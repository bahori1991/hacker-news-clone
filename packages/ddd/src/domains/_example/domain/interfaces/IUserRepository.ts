import type { User } from "@/domains/User/domain/entities/User";
import type { UserEmail } from "@/domains/User/domain/value-objects/UserEmail";
import type { UserId } from "@/domains/User/domain/value-objects/UserId";

export interface IUserRepository {
  findById(id: UserId): Promise<User | undefined>;
  isEmailRegistered(email: UserEmail, excludeUserId?: UserId): Promise<boolean>;
}
