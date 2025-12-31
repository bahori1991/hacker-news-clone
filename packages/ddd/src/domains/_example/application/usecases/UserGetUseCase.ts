import { inject, injectable } from "inversify";
import type { User } from "@/domains/User/domain/entities/User";
import type { IUserAuthService } from "@/domains/User/domain/interfaces/IUserAuthService";
import { USER_DI_TOKENS } from "@/domains/User/shared/tokens";

@injectable()
export class UserGetUseCase {
  readonly #userAuthService: IUserAuthService;

  public constructor(
    @inject(USER_DI_TOKENS.UserAuthService) userAuthService: IUserAuthService,
  ) {
    this.#userAuthService = userAuthService;
  }

  public async execute(): Promise<User | undefined> {
    return this.#userAuthService.getLoggedInUser();
  }
}
