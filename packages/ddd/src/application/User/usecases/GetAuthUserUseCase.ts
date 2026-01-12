import type { IUserAuthService } from "@packages/ddd/domain/User/interfaces/IUserAuthService";
import type { User } from "@packages/ddd/domain/User/User";
import { USER_INFRASTRUCTURE_SYMBOL } from "@packages/ddd/infrastructure/User/symbols/UserInfrastructureSymbol";
import { DataModelBuilder } from "@packages/ddd/shared/libs/DataModelBuilder";
import { inject, injectable } from "inversify";
import type { UserDTO } from "../dto/UserDTO";

@injectable()
export class GetAuthUserUseCase {
  readonly #userAuthService: IUserAuthService;

  public constructor(
    @inject(USER_INFRASTRUCTURE_SYMBOL.UserAuthService)
    userAuthService: IUserAuthService,
  ) {
    this.#userAuthService = userAuthService;
  }

  public async execute(headers?: Headers): Promise<UserDTO> {
    const user = await this.#userAuthService.getAuthUser(headers);
    const builder = new DataModelBuilder<User>();
    user.toDataModel(builder);
    return builder.build();
  }
}
