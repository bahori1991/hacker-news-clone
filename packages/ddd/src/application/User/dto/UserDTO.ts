export type UserDTO = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
};
