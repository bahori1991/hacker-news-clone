import type { UserSignInCommand } from "@packages/ddd/application/User/commands/UserSignInCommand";
import type { UserDTO } from "@packages/ddd/application/User/dto/UserDTO";
import type { IUserAuthService } from "@packages/ddd/domain/User/interfaces/IUserAuthService";
import type { User } from "@packages/ddd/domain/User/User";
import { UserEmail } from "@packages/ddd/domain/User/value-objects/UserEmail";
import { UserPassword } from "@packages/ddd/domain/User/value-objects/UserPassword";
import { USER_INFRASTRUCTURE_SYMBOL } from "@packages/ddd/infrastructure/User/symbols/UserInfrastructureSymbol";
import { DataModelBuilder } from "@packages/ddd/shared/libs/DataModelBuilder";
import { inject, injectable } from "inversify";

@injectable()
export class SignInUserUseCase {
  readonly #userAuthService: IUserAuthService;

  public constructor(
    @inject(USER_INFRASTRUCTURE_SYMBOL.UserAuthService)
    userAuthService: IUserAuthService,
  ) {
    this.#userAuthService = userAuthService;
  }

  public async execute(command: UserSignInCommand): Promise<UserDTO> {
    const email = new UserEmail(command.email);
    const password = new UserPassword(command.password);

    const user = await this.#userAuthService.signInEmail({ email, password });

    const builder = new DataModelBuilder<User>();
    user.toDataModel(builder);
    return builder.build();
  }
}
