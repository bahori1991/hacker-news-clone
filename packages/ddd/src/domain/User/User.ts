import type { UserEmail } from "@packages/ddd/domain/User/value-objects/UserEmail";
import type { UserEmailVerified } from "@packages/ddd/domain/User/value-objects/UserEmailVerified";
import type { UserId } from "@packages/ddd/domain/User/value-objects/UserId";
import type { UserImage } from "@packages/ddd/domain/User/value-objects/UserImage";
import type { UserName } from "@packages/ddd/domain/User/value-objects/UserName";
import { Entity } from "@packages/ddd/shared/libs/Entity";
import type { CreatedAt } from "@packages/ddd/shared/value-objects/CreatedAt";
import type { UpdatedAt } from "@packages/ddd/shared/value-objects/UpdatedAt";

export type UserProps = {
  id: UserId;
  name: UserName;
  email: UserEmail;
  emailVerified: UserEmailVerified;
  image?: UserImage;
  createdAt?: CreatedAt;
  updatedAt?: UpdatedAt;
};

export class User extends Entity<UserProps> {}
