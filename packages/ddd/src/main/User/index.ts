import type { UserDTO } from "@packages/ddd/application/User/dto/UserDTO";
import { userContainer } from "@packages/ddd/container/User";
import type { UserController } from "@packages/ddd/presentation/User/server/UserController";
import { USER_PRESENTATION_SYMBOL } from "@packages/ddd/presentation/User/symbols/UserPresentationSymbol";

const userController = userContainer.get<UserController>(
  USER_PRESENTATION_SYMBOL.UserController,
);

export { userController, type UserDTO as User };
