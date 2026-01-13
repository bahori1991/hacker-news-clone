import { z } from "zod";

export const userSignInCommandSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type UserSignInCommand = z.infer<typeof userSignInCommandSchema>;
