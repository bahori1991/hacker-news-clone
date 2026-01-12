import type { UserSignUpCommand } from "@packages/ddd/application/User/commands/UserSignUpCommand";
import type { UserDTO } from "@packages/ddd/application/User/dto/UserDTO";
import { UserEmailExistsError } from "@packages/ddd/application/User/errors/UserEmailExistsError";
import type { IUserAuthService } from "@packages/ddd/domain/User/interfaces/IUserAuthService";
import type { IUserDomainService } from "@packages/ddd/domain/User/interfaces/IUserDomainService";
import { USER_DOMAIN_SYMBOL } from "@packages/ddd/domain/User/symbols/UserDomainSymbol";
import type { User } from "@packages/ddd/domain/User/User";
import { UserEmail } from "@packages/ddd/domain/User/value-objects/UserEmail";
import { UserImage } from "@packages/ddd/domain/User/value-objects/UserImage";
import { UserName } from "@packages/ddd/domain/User/value-objects/UserName";
import { UserPassword } from "@packages/ddd/domain/User/value-objects/UserPassword";
import { USER_INFRASTRUCTURE_SYMBOL } from "@packages/ddd/infrastructure/User/symbols/UserInfrastructureSymbol";
import { DataModelBuilder } from "@packages/ddd/shared/libs/DataModelBuilder";
import { inject, injectable } from "inversify";

@injectable()
export class SignUpUserUseCase {
  readonly #userAuthService: IUserAuthService;
  readonly #userDomainService: IUserDomainService;

  public constructor(
    @inject(USER_INFRASTRUCTURE_SYMBOL.UserAuthService)
    userAuthService: IUserAuthService,
    @inject(USER_DOMAIN_SYMBOL.UserDomainService)
    userDomainService: IUserDomainService,
  ) {
    this.#userAuthService = userAuthService;
    this.#userDomainService = userDomainService;
  }

  public async execute(command: UserSignUpCommand): Promise<UserDTO> {
    const name = new UserName(command.name);
    const email = new UserEmail(command.email);
    const password = new UserPassword(command.password);
    const image = new UserImage(command.image) ?? undefined;

    const isEmailExists = await this.#userDomainService.userEmailExists(email);

    if (isEmailExists) {
      throw new UserEmailExistsError(email);
    }

    const user = await this.#userAuthService.signUpEmail({
      name,
      email,
      password,
      image,
    });

    const builder = new DataModelBuilder<User>();
    user.toDataModel(builder);
    return builder.build();
  }
}
