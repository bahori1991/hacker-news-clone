import type { IUserDomainService } from "@packages/ddd/domain/User/interfaces/IUserDomainService";
import type { IUserRepository } from "@packages/ddd/domain/User/interfaces/IUserRepository";
import { USER_DOMAIN_SYMBOL } from "@packages/ddd/domain/User/symbols/UserDomainSymbol";
import type { UserEmail } from "@packages/ddd/domain/User/value-objects/UserEmail";
import type { UserId } from "@packages/ddd/domain/User/value-objects/UserId";
import { inject, injectable } from "inversify";

@injectable()
export class UserDomainService implements IUserDomainService {
  readonly #userRepository;

  public constructor(
    @inject(USER_DOMAIN_SYMBOL.UserRepository) userRepository: IUserRepository,
  ) {
    this.#userRepository = userRepository;
  }

  public async userEmailExists(
    email: UserEmail,
    excludeUserId?: UserId,
  ): Promise<boolean> {
    const user = await this.#userRepository.findByEmail(email);

    if (!user) {
      return false;
    }

    if (excludeUserId) {
      return !user.id.equals(excludeUserId);
    }

    return true;
  }
}
