import { authClient } from "@packages/auth/client";
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
export class ClientUserAuthService implements IUserAuthService {
  readonly #userFactory: IUserFactory;

  public constructor(
    @inject(USER_DOMAIN_SYMBOL.UserFactory) userFactory: IUserFactory,
  ) {
    this.#userFactory = userFactory;
  }

  public async signUpEmail(props: SignUpEmailProps): Promise<User> {
    const { data, error } = await authClient.signUp.email({
      email: props.email.value,
      password: props.password.value,
      name: props.name.value,
      image: props.image?.value ?? undefined,
    });

    if (error || !data?.user) {
      throw new UserSignUpFailedError(error);
    }

    return this.#userFactory.reconstruct(data.user);
  }

  public async signInEmail(props: SignInEmailProps): Promise<User> {
    const { data, error } = await authClient.signIn.email({
      email: props.email.value,
      password: props.password.value,
    });

    if (error || !data?.user) {
      throw new UserSignInFailedError(error);
    }

    return this.#userFactory.reconstruct(data.user);
  }

  public async getAuthUser(_headers?: Headers): Promise<User> {
    const { data: session } = await authClient.getSession();

    if (!session || !session.user) {
      throw new UnauthorizedError();
    }

    return this.#userFactory.reconstruct(session.user);
  }

  public async signOut(): Promise<void> {
    await authClient.signOut();
  }
}
