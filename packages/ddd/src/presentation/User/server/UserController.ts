import type { UserSignInCommand } from "@packages/ddd/application/User/commands/UserSignInCommand";
import type { UserSignUpCommand } from "@packages/ddd/application/User/commands/UserSignUpCommand";
import type { UserDTO } from "@packages/ddd/application/User/dto/UserDTO";
import { USER_APPLICATION_SYMBOL } from "@packages/ddd/application/User/symbols/UserApplicationSymbol";
import type { GetAuthUserUseCase } from "@packages/ddd/application/User/usecases/GetAuthUserUseCase";
import type { SignInUserUseCase } from "@packages/ddd/application/User/usecases/SignInUserUseCase";
import type { SignOutUserUseCase } from "@packages/ddd/application/User/usecases/SignOutUserUseCase";
import type { SignUpUserUseCase } from "@packages/ddd/application/User/usecases/SignUpUserUseCase";
import { inject, injectable } from "inversify";

@injectable()
export class UserController {
  readonly #getAuthUserUseCase: GetAuthUserUseCase;
  readonly #signUpUserUseCase: SignUpUserUseCase;
  readonly #signInUserUseCase: SignInUserUseCase;
  readonly #signOutUserUseCase: SignOutUserUseCase;

  public constructor(
    @inject(USER_APPLICATION_SYMBOL.GetAuthUserUseCase)
    getAuthUserUseCase: GetAuthUserUseCase,
    @inject(USER_APPLICATION_SYMBOL.SignUpUserUseCase)
    signUpUserUseCase: SignUpUserUseCase,
    @inject(USER_APPLICATION_SYMBOL.SignInUserUseCase)
    signInUserUseCase: SignInUserUseCase,
    @inject(USER_APPLICATION_SYMBOL.SignOutUserUseCase)
    signOutUserUseCase: SignOutUserUseCase,
  ) {
    this.#getAuthUserUseCase = getAuthUserUseCase;
    this.#signUpUserUseCase = signUpUserUseCase;
    this.#signInUserUseCase = signInUserUseCase;
    this.#signOutUserUseCase = signOutUserUseCase;
  }

  public async getAuthUser(headers?: Headers): Promise<UserDTO | null> {
    return await this.#getAuthUserUseCase.execute(headers);
  }

  public async signUp(props: UserSignUpCommand): Promise<UserDTO> {
    return await this.#signUpUserUseCase.execute(props);
  }

  public async signIn(props: UserSignInCommand): Promise<UserDTO> {
    return await this.#signInUserUseCase.execute(props);
  }

  public async signOut(): Promise<void> {
    return await this.#signOutUserUseCase.execute();
  }
}
