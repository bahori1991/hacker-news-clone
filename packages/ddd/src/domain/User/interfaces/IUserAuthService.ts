import type { User } from "@packages/ddd/domain/User/User";
import type { UserEmail } from "@packages/ddd/domain/User/value-objects/UserEmail";
import type { UserImage } from "@packages/ddd/domain/User/value-objects/UserImage";
import type { UserName } from "@packages/ddd/domain/User/value-objects/UserName";
import type { UserPassword } from "@packages/ddd/domain/User/value-objects/UserPassword";

export type SignUpEmailProps = {
  email: UserEmail;
  password: UserPassword;
  name: UserName;
  image?: UserImage;
};

export type SignInEmailProps = {
  email: UserEmail;
  password: UserPassword;
};

export interface IUserAuthService {
  signUpEmail(props: SignUpEmailProps): Promise<User>;
  signInEmail(props: SignInEmailProps): Promise<User>;
  getAuthUser(headers?: Headers): Promise<User>;
  signOut(): Promise<void>;
}
