import { inject, injectable } from "inversify";
import type { IUserAuthService } from "@/domains/User/domain/interfaces/IUserAuthService";
import { USER_DI_TOKENS } from "@/domains/User/shared/tokens";

@injectable()
export class UserSignOutUseCase {
  readonly #userAuthService: IUserAuthService;

  public constructor(
    @inject(USER_DI_TOKENS.UserAuthService) userAuthService: IUserAuthService,
  ) {
    this.#userAuthService = userAuthService;
  }

  public async execute(sessionId: string): Promise<void> {
    const headers = new Headers();
    headers.set("Cookie", `session=${sessionId}`);
    await this.#userAuthService.signOut(headers);
  }
}
