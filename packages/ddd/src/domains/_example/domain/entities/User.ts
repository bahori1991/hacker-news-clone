import type { UserCreatedAt } from "@/domains/User/domain/value-objects/UserCreatedAt";
import type { UserEmail } from "@/domains/User/domain/value-objects/UserEmail";
import type { UserEmailVerified } from "@/domains/User/domain/value-objects/UserEmailVerified";
import type { UserId } from "@/domains/User/domain/value-objects/UserId";
import type { UserImage } from "@/domains/User/domain/value-objects/UserImage";
import type { UserName } from "@/domains/User/domain/value-objects/UserName";
import type { UserUpdatedAt } from "@/domains/User/domain/value-objects/UserUpdatedAt";
import { Entity, type EntityProps } from "@/libs/Entity";

export interface UserProps extends EntityProps<UserId> {
  createdAt: UserCreatedAt;
  updatedAt: UserUpdatedAt;
  email: UserEmail;
  emailVerified: UserEmailVerified;
  name: UserName;
  image?: UserImage;
}

export class User extends Entity<UserProps> {
  public get name(): UserName {
    return this.props.name;
  }

  public get email(): UserEmail {
    return this.props.email;
  }

  public get image(): UserImage | undefined {
    return this.props.image;
  }

  public get emailVerified(): UserEmailVerified {
    return this.props.emailVerified;
  }

  public get createdAt(): UserCreatedAt {
    return this.props.createdAt;
  }

  public get updatedAt(): UserUpdatedAt {
    return this.props.updatedAt;
  }
}
