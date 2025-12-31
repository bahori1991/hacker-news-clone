import type { User, UserProps } from "@/domains/User/domain/entities/User";
import type { ValueOfEntityProps } from "@/libs/Entity";

export interface IUserFactory {
  create(props: ValueOfEntityProps<UserProps>): User;
}
