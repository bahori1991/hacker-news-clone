import "reflect-metadata";
import { Container } from "inversify";
import { UserGetUseCase } from "@/domains/User/application/usecases/UserGetUseCase";
import { UserSignInUseCase } from "@/domains/User/application/usecases/UserSignInUseCase";
import { UserSignOutUseCase } from "@/domains/User/application/usecases/UserSignOutUseCase";
import { UserSignUpUseCase } from "@/domains/User/application/usecases/UserSignUpUseCase";
import { UserFactory } from "@/domains/User/domain/entities/UserFactory";
import type { IUserAuthService } from "@/domains/User/domain/interfaces/IUserAuthService";
import type { IUserFactory } from "@/domains/User/domain/interfaces/IUserFactory";
import type { IUserRepository } from "@/domains/User/domain/interfaces/IUserRepository";
import { UserAuthService } from "@/domains/User/infrastructure/UserAuthService";
import { UserRepository } from "@/domains/User/infrastructure/UserRepository";
import { USER_DI_TOKENS } from "./tokens";

const userContainer = new Container();

userContainer
  .bind<IUserAuthService>(USER_DI_TOKENS.UserAuthService)
  .to(UserAuthService)
  .inSingletonScope();

userContainer
  .bind<IUserRepository>(USER_DI_TOKENS.UserRepository)
  .to(UserRepository)
  .inSingletonScope();

userContainer
  .bind<IUserFactory>(USER_DI_TOKENS.UserFactory)
  .to(UserFactory)
  .inSingletonScope();

userContainer
  .bind<UserGetUseCase>(USER_DI_TOKENS.UserGetUseCase)
  .to(UserGetUseCase)
  .inSingletonScope();

userContainer
  .bind<UserSignInUseCase>(USER_DI_TOKENS.UserSignInUseCase)
  .to(UserSignInUseCase)
  .inSingletonScope();

userContainer
  .bind<UserSignOutUseCase>(USER_DI_TOKENS.UserSignOutUseCase)
  .to(UserSignOutUseCase)
  .inSingletonScope();

userContainer
  .bind<UserSignUpUseCase>(USER_DI_TOKENS.UserSignUpUseCase)
  .to(UserSignUpUseCase)
  .inSingletonScope();

export { userContainer };
