import { db, eq } from "@packages/db";
import { users as usersTable } from "@packages/db/schemas/auth";
import { inject, injectable } from "inversify";
import type { User } from "@/domains/User/domain/entities/User";
import type { IUserFactory } from "@/domains/User/domain/interfaces/IUserFactory";
import type { IUserRepository } from "@/domains/User/domain/interfaces/IUserRepository";
import type { UserEmail } from "@/domains/User/domain/value-objects/UserEmail";
import { UserId } from "@/domains/User/domain/value-objects/UserId";
import { USER_DI_TOKENS } from "@/domains/User/shared/tokens";

@injectable()
export class UserRepository implements IUserRepository {
  readonly #userFactory: IUserFactory;

  constructor(
    @inject(USER_DI_TOKENS.UserFactory)
    userFactory: IUserFactory,
  ) {
    this.#userFactory = userFactory;
  }

  public async findById(id: UserId): Promise<User | undefined> {
    const [data] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id.value))
      .limit(1);

    if (!data) {
      return undefined;
    }

    const user = {
      ...data,
      name: data.name ?? "",
      image: data.image ?? undefined,
    };

    return this.#userFactory.create(user);
  }

  public async isEmailRegistered(
    email: UserEmail,
    excludeUserId?: UserId,
  ): Promise<boolean> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.value))
      .limit(1);

    if (!user) {
      return false;
    }

    if (excludeUserId?.equals(new UserId(user.id))) {
      return false;
    }

    return true;
  }
}
