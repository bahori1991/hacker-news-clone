export const USER_APPLICATION_SYMBOL = {
  SignUpUserUseCase: Symbol.for("SignUpUserUseCase"),
  SignInUserUseCase: Symbol.for("SignInUserUseCase"),
  SignOutUserUseCase: Symbol.for("SignOutUserUseCase"),
  GetAuthUserUseCase: Symbol.for("GetAuthUserUseCase"),
} as const;