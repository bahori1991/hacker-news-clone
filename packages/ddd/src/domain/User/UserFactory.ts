import type { IUserFactory } from "@packages/ddd/domain/User/interfaces/IUserFactory";
import { User } from "@packages/ddd/domain/User/User";
import { UserEmail } from "@packages/ddd/domain/User/value-objects/UserEmail";
import { UserEmailVerified } from "@packages/ddd/domain/User/value-objects/UserEmailVerified";
import { UserId } from "@packages/ddd/domain/User/value-objects/UserId";
import { UserImage } from "@packages/ddd/domain/User/value-objects/UserImage";
import { UserName } from "@packages/ddd/domain/User/value-objects/UserName";
import type {
  TypeOfEntity,
  UnpackInputTypeOfEntity,
} from "@packages/ddd/shared/libs/Entity";
import { CreatedAt } from "@packages/ddd/shared/value-objects/CreatedAt";
import { UpdatedAt } from "@packages/ddd/shared/value-objects/UpdatedAt";
import { injectable } from "inversify";

@injectable()
export class UserFactory implements IUserFactory {
  public create(props: TypeOfEntity<User>): User {
    return new User(props);
  }

  public reconstruct(props: UnpackInputTypeOfEntity<User>): User {
    return new User({
      id: new UserId(props.id),
      name: new UserName(props.name),
      email: new UserEmail(props.email),
      emailVerified: new UserEmailVerified(props.emailVerified),
      image: new UserImage(props.image),
      createdAt: props.createdAt ? new CreatedAt(props.createdAt) : undefined,
      updatedAt: props.updatedAt ? new UpdatedAt(props.updatedAt) : undefined,
    });
  }
}
