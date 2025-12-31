import { auth } from "@packages/auth";
import { inject, injectable } from "inversify";
import type { User } from "@/domains/User/domain/entities/User";
import type { IUserAuthService } from "@/domains/User/domain/interfaces/IUserAuthService";
import type { IUserFactory } from "@/domains/User/domain/interfaces/IUserFactory";
import type { UserEmail } from "@/domains/User/domain/value-objects/UserEmail";
import { UserId } from "@/domains/User/domain/value-objects/UserId";
import type { UserImage } from "@/domains/User/domain/value-objects/UserImage";
import type { UserName } from "@/domains/User/domain/value-objects/UserName";
import type { UserPassword } from "@/domains/User/domain/value-objects/UserPassword";
import {
  InternalServerError,
  InValidEmailOrPasswordError,
  UnexpectedError,
  UserEmailAlreadyRegisteredError,
  UserSignUpFailedError,
} from "@/domains/User/shared/errors/UserError";
import { USER_DI_TOKENS } from "@/domains/User/shared/tokens";

@injectable()
export class UserAuthService implements IUserAuthService {
  readonly #userFactory: IUserFactory;

  constructor(
    @inject(USER_DI_TOKENS.UserFactory)
    userFactory: IUserFactory,
  ) {
    this.#userFactory = userFactory;
  }

  public async signUpWithEmail(props: {
    email: UserEmail;
    password: UserPassword;
    name: UserName;
    image?: UserImage;
  }): Promise<{ userId: UserId }> {
    try {
      const res = await auth.api.signUpEmail({
        body: {
          email: props.email.value,
          password: props.password.value,
          name: props.name.value,
          image: props.image?.value,
        },
      });
      const userIdString = res.user?.id;
      if (!userIdString) {
        throw new UserSignUpFailedError();
      }
      return { userId: new UserId(userIdString) };
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Email already registered")
      ) {
        throw new UserEmailAlreadyRegisteredError(props.email.value);
      }
      throw error;
    }
  }

  public async signInWithEmail(props: {
    email: UserEmail;
    password: UserPassword;
  }): Promise<void> {
    const res = await auth.api.signInEmail({
      body: {
        email: props.email.value,
        password: props.password.value,
      },
      asResponse: true,
    });

    if (res.ok) {
      return;
    }

    switch (res.status) {
      case 401:
        throw new InValidEmailOrPasswordError();
      case 500:
        throw new InternalServerError(res.statusText);
      default:
        throw new UnexpectedError(res.statusText);
    }
  }

  public async getLoggedInUser(): Promise<User | undefined> {
    const session = await auth.api.getSession();

    if (!session) {
      return undefined;
    }

    return this.#userFactory.create(session.user);
  }

  public async signOut(headers: Headers): Promise<void> {
    await auth.api.signOut({ headers });
  }
}
