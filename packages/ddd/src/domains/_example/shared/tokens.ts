export const USER_DI_TOKENS = {
  UserAuthService: Symbol.for("UserAuthService"),
  UserRepository: Symbol.for("UserRepository"),
  UserFactory: Symbol.for("UserFactory"),
  UserGetUseCase: Symbol.for("UserGetUseCase"),
  UserSignInUseCase: Symbol.for("UserSignInUseCase"),
  UserSignOutUseCase: Symbol.for("UserSignOutUseCase"),
  UserSignUpUseCase: Symbol.for("UserSignUpUseCase"),
} as const;
