import { DomainError } from "@/libs/DomainError";

export class UserEmailAlreadyRegisteredError extends DomainError {
  constructor(email: string) {
    super(
      `Email ${email} is already registered`,
      "USER_EMAIL_ALREADY_REGISTERED",
    );
  }
}

export class UserNotFoundError extends DomainError {
  constructor(id: string) {
    super(`User ${id} not found`, "USER_NOT_FOUND");
  }
}

export class UserSignUpFailedError extends DomainError {
  constructor() {
    super("User sign up failed", "USER_SIGN_UP_FAILED");
  }
}

export class InValidEmailOrPasswordError extends DomainError {
  constructor() {
    super("Invalid email or password", "INVALID_EMAIL_OR_PASSWORD");
  }
}

export class InternalServerError extends DomainError {
  constructor(message: string) {
    super(`Internal server error: ${message}`, "INTERNAL_SERVER_ERROR");
  }
}

export class UnexpectedError extends DomainError {
  constructor(message: string) {
    super(`Unexpected error: ${message}`, "UNEXPECTED_ERROR");
  }
}
