export type UserSignUpCommand = {
  name: string;
  email: string;
  password: string;
  image?: string | null | undefined;
};
