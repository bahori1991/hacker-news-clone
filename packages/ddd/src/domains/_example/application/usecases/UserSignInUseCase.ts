import { inject, injectable } from "inversify";
import type { UserSignInCommand } from "@/domains/User/application/commands/UserSignInCommand";
import type { IUserAuthService } from "@/domains/User/domain/interfaces/IUserAuthService";
import { UserEmail } from "@/domains/User/domain/value-objects/UserEmail";
import { UserPassword } from "@/domains/User/domain/value-objects/UserPassword";
import { USER_DI_TOKENS } from "@/domains/User/shared/tokens";

@injectable()
export class UserSignInUseCase {
  readonly #userAuthService: IUserAuthService;

  public constructor(
    @inject(USER_DI_TOKENS.UserAuthService) userAuthService: IUserAuthService,
  ) {
    this.#userAuthService = userAuthService;
  }

  public async execute(command: UserSignInCommand): Promise<void> {
    const email = new UserEmail(command.email);
    const password = new UserPassword(command.password);

    await this.#userAuthService.signInWithEmail({
      email,
      password,
    });
  }
}
