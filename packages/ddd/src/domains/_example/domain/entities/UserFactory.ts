import { injectable } from "inversify";
import { User, type UserProps } from "@/domains/User/domain/entities/User";
import type { IUserFactory } from "@/domains/User/domain/interfaces/IUserFactory";
import { UserCreatedAt } from "@/domains/User/domain/value-objects/UserCreatedAt";
import { UserEmail } from "@/domains/User/domain/value-objects/UserEmail";
import { UserEmailVerified } from "@/domains/User/domain/value-objects/UserEmailVerified";
import { UserId } from "@/domains/User/domain/value-objects/UserId";
import { UserImage } from "@/domains/User/domain/value-objects/UserImage";
import { UserName } from "@/domains/User/domain/value-objects/UserName";
import { UserUpdatedAt } from "@/domains/User/domain/value-objects/UserUpdatedAt";
import type { ValueOfEntityProps } from "@/libs/Entity";

@injectable()
export class UserFactory implements IUserFactory {
  public create(props: ValueOfEntityProps<UserProps>): User {
    return new User({
      id: new UserId(props.id),
      name: new UserName(props.name),
      email: new UserEmail(props.email),
      emailVerified: new UserEmailVerified(props.emailVerified),
      image: props.image ? new UserImage(props.image) : undefined,
      createdAt: new UserCreatedAt(props.createdAt),
      updatedAt: new UserUpdatedAt(props.updatedAt),
    });
  }
}
