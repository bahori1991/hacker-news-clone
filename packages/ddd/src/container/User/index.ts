import { USER_APPLICATION_SYMBOL } from "@packages/ddd/application/User/symbols/UserApplicationSymbol";
import { GetAuthUserUseCase } from "@packages/ddd/application/User/usecases/GetAuthUserUseCase";
import { SignInUserUseCase } from "@packages/ddd/application/User/usecases/SignInUserUseCase";
import { SignOutUserUseCase } from "@packages/ddd/application/User/usecases/SignOutUserUseCase";
import { SignUpUserUseCase } from "@packages/ddd/application/User/usecases/SignUpUserUseCase";
import type { IUserAuthService } from "@packages/ddd/domain/User/interfaces/IUserAuthService";
import type { IUserDomainService } from "@packages/ddd/domain/User/interfaces/IUserDomainService";
import type { IUserFactory } from "@packages/ddd/domain/User/interfaces/IUserFactory";
import type { IUserRepository } from "@packages/ddd/domain/User/interfaces/IUserRepository";
import { UserDomainService } from "@packages/ddd/domain/User/services/UserDomainService";
import { USER_DOMAIN_SYMBOL } from "@packages/ddd/domain/User/symbols/UserDomainSymbol";
import { UserFactory } from "@packages/ddd/domain/User/UserFactory";
import { UserRepository } from "@packages/ddd/infrastructure/User/repositories/UserRepository";
import { ClientUserAuthService } from "@packages/ddd/infrastructure/User/services/ClientUserAuthService";
import { ServerUserAuthService } from "@packages/ddd/infrastructure/User/services/ServerUserAuthService";
import { USER_INFRASTRUCTURE_SYMBOL } from "@packages/ddd/infrastructure/User/symbols/UserInfrastructureSymbol";
import { UserController } from "@packages/ddd/presentation/User/server/UserController";
import { USER_PRESENTATION_SYMBOL } from "@packages/ddd/presentation/User/symbols/UserPresentationSymbol";
import { Container } from "inversify";

const isServer = !("window" in globalThis);

const userContainer = new Container();

userContainer
  .bind<IUserFactory>(USER_DOMAIN_SYMBOL.UserFactory)
  .to(UserFactory)
  .inSingletonScope();

userContainer
  .bind<IUserRepository>(USER_DOMAIN_SYMBOL.UserRepository)
  .to(UserRepository)
  .inSingletonScope();

userContainer
  .bind<IUserDomainService>(USER_DOMAIN_SYMBOL.UserDomainService)
  .to(UserDomainService)
  .inSingletonScope();

if (isServer) {
  userContainer
    .bind<IUserAuthService>(USER_INFRASTRUCTURE_SYMBOL.UserAuthService)
    .to(ServerUserAuthService)
    .inSingletonScope();
} else {
  userContainer
    .bind<IUserAuthService>(USER_INFRASTRUCTURE_SYMBOL.UserAuthService)
    .to(ClientUserAuthService)
    .inSingletonScope();
}

userContainer
  .bind<SignInUserUseCase>(USER_APPLICATION_SYMBOL.SignInUserUseCase)
  .to(SignInUserUseCase)
  .inSingletonScope();

userContainer
  .bind<SignUpUserUseCase>(USER_APPLICATION_SYMBOL.SignUpUserUseCase)
  .to(SignUpUserUseCase)
  .inSingletonScope();

userContainer
  .bind<GetAuthUserUseCase>(USER_APPLICATION_SYMBOL.GetAuthUserUseCase)
  .to(GetAuthUserUseCase)
  .inSingletonScope();

userContainer
  .bind<SignOutUserUseCase>(USER_APPLICATION_SYMBOL.SignOutUserUseCase)
  .to(SignOutUserUseCase)
  .inSingletonScope();

userContainer
  .bind<UserController>(USER_PRESENTATION_SYMBOL.UserController)
  .to(UserController)
  .inSingletonScope();

export { userContainer };
