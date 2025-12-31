import type { User } from "@/domains/User/domain/entities/User";
import type { UserEmail } from "@/domains/User/domain/value-objects/UserEmail";
import type { UserId } from "@/domains/User/domain/value-objects/UserId";
import type { UserImage } from "@/domains/User/domain/value-objects/UserImage";
import type { UserName } from "@/domains/User/domain/value-objects/UserName";
import type { UserPassword } from "@/domains/User/domain/value-objects/UserPassword";

export interface IUserAuthService {
  signUpWithEmail(props: {
    email: UserEmail;
    password: UserPassword;
    name: UserName;
    image?: UserImage;
  }): Promise<{ userId: UserId }>;

  signInWithEmail(props: {
    email: UserEmail;
    password: UserPassword;
  }): Promise<void>;

  getLoggedInUser(): Promise<User | undefined>;

  signOut(headers: Headers): Promise<void>;
}
