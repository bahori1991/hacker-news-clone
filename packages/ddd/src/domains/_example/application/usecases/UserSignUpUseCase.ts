import { inject, injectable } from "inversify";
import type { UserSignUpCommand } from "@/domains/User/application/commands/UserSignUpCommand";
import type { IUserAuthService } from "@/domains/User/domain/interfaces/IUserAuthService";
import type { IUserRepository } from "@/domains/User/domain/interfaces/IUserRepository";
import { UserEmail } from "@/domains/User/domain/value-objects/UserEmail";
import type { UserId } from "@/domains/User/domain/value-objects/UserId";
import { UserImage } from "@/domains/User/domain/value-objects/UserImage";
import { UserName } from "@/domains/User/domain/value-objects/UserName";
import { UserPassword } from "@/domains/User/domain/value-objects/UserPassword";
import { UserEmailAlreadyRegisteredError } from "@/domains/User/shared/errors/UserError";
import { USER_DI_TOKENS } from "@/domains/User/shared/tokens";

@injectable()
export class UserSignUpUseCase {
  readonly #userAuthService: IUserAuthService;
  readonly #userRepository: IUserRepository;

  public constructor(
    @inject(USER_DI_TOKENS.UserAuthService) userAuthService: IUserAuthService,
    @inject(USER_DI_TOKENS.UserRepository) userRepository: IUserRepository,
  ) {
    this.#userAuthService = userAuthService;
    this.#userRepository = userRepository;
  }

  public async execute(
    command: UserSignUpCommand,
  ): Promise<{ userId: UserId }> {
    const email = new UserEmail(command.email);
    const password = new UserPassword(command.password);
    const name = new UserName(command.name);
    const image = command.image ? new UserImage(command.image) : undefined;

    const isEmailRegistered =
      await this.#userRepository.isEmailRegistered(email);
    if (isEmailRegistered) {
      throw new UserEmailAlreadyRegisteredError(email.value);
    }

    const { userId } = await this.#userAuthService.signUpWithEmail({
      email,
      password,
      name,
      image,
    });

    return { userId };
  }
}
