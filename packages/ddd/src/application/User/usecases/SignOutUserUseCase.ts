import type { IUserAuthService } from "@packages/ddd/domain/User/interfaces/IUserAuthService";
import { USER_INFRASTRUCTURE_SYMBOL } from "@packages/ddd/infrastructure/User/symbols/UserInfrastructureSymbol";
import { inject, injectable } from "inversify";

@injectable()
export class SignOutUserUseCase {
  readonly #userAuthService: IUserAuthService;

  public constructor(
    @inject(USER_INFRASTRUCTURE_SYMBOL.UserAuthService)
    userAuthService: IUserAuthService,
  ) {
    this.#userAuthService = userAuthService;
  }

  public async execute(): Promise<void> {
    await this.#userAuthService.signOut();
  }
}
