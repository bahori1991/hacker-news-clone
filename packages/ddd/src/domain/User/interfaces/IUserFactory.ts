import type { User } from "@packages/ddd/domain/User/User";
import type {
  TypeOfEntity,
  UnpackInputTypeOfEntity,
} from "@packages/ddd/shared/libs/Entity";

export interface IUserFactory {
  create(props: TypeOfEntity<User>): User;
  reconstruct(props: UnpackInputTypeOfEntity<User>): User;
}
