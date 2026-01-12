import { db, eq } from "@packages/db";
import { usersTable } from "@packages/db/schemas/auth";
import type { IUserFactory } from "@packages/ddd/domain/User/interfaces/IUserFactory";
import type { IUserRepository } from "@packages/ddd/domain/User/interfaces/IUserRepository";
import { USER_DOMAIN_SYMBOL } from "@packages/ddd/domain/User/symbols/UserDomainSymbol";
import type { User } from "@packages/ddd/domain/User/User";
import type { UserEmail } from "@packages/ddd/domain/User/value-objects/UserEmail";
import type { UserId } from "@packages/ddd/domain/User/value-objects/UserId";
import { inject, injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
  readonly #userFactory;

  public constructor(
    @inject(USER_DOMAIN_SYMBOL.UserFactory) userFactory: IUserFactory,
  ) {
    this.#userFactory = userFactory;
  }

  public async findById(id: UserId): Promise<User | null> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id.value))
      .limit(1);

    if (!user) {
      return null;
    }

    return this.#userFactory.reconstruct(user);
  }

  public async findByEmail(email: UserEmail): Promise<User | null> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.value))
      .limit(1);

    if (!user) {
      return null;
    }

    return this.#userFactory.reconstruct(user);
  }
}
