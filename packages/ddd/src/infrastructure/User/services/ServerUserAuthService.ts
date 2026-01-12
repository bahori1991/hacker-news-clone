import { auth } from "@packages/auth/server";
import { UnauthorizedError } from "@packages/ddd/domain/User/errors/UnauthorizedError";
import { UserSignInFailedError } from "@packages/ddd/domain/User/errors/UserSignInFailedError";
import { UserSignUpFailedError } from "@packages/ddd/domain/User/errors/UserSignUpFailedError";
import type {
  IUserAuthService,
  SignInEmailProps,
  SignUpEmailProps,
} from "@packages/ddd/domain/User/interfaces/IUserAuthService";
import type { IUserFactory } from "@packages/ddd/domain/User/interfaces/IUserFactory";
import { USER_DOMAIN_SYMBOL } from "@packages/ddd/domain/User/symbols/UserDomainSymbol";
import type { User } from "@packages/ddd/domain/User/User";
import { inject, injectable } from "inversify";

@injectable()
export class ServerUserAuthService implements IUserAuthService {
  readonly #userFactory: IUserFactory;

  public constructor(
    @inject(USER_DOMAIN_SYMBOL.UserFactory) userFactory: IUserFactory,
  ) {
    this.#userFactory = userFactory;
  }

  public async signUpEmail(props: SignUpEmailProps): Promise<User> {
    try {
      const { user } = await auth.api.signUpEmail({
        body: {
          email: props.email.value,
          password: props.password.value,
          name: props.name.value,
          image: props.image?.value ?? undefined,
        },
      });
      return this.#userFactory.reconstruct(user);
    } catch (error) {
      throw new UserSignUpFailedError(error);
    }
  }

  public async signInEmail(props: SignInEmailProps): Promise<User> {
    try {
      const { user } = await auth.api.signInEmail({
        body: {
          email: props.email.value,
          password: props.password.value,
        },
      });
      return this.#userFactory.reconstruct(user);
    } catch (error) {
      throw new UserSignInFailedError(error);
    }
  }

  public async getAuthUser(headers?: Headers): Promise<User> {
    if (!headers) {
      throw new UnauthorizedError();
    }

    const session = await auth.api.getSession({ headers });

    if (!session || !session.user) {
      throw new UnauthorizedError();
    }

    return this.#userFactory.reconstruct(session.user);
  }

  public async signOut(): Promise<void> {
    await auth.api.signOut();
  }
}
