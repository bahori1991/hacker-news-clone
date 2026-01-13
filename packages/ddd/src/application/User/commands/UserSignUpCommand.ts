import z from "zod";

export const userSignUpCommandSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  image: z.string().optional().nullable(),
});

export type UserSignUpCommand = z.infer<typeof userSignUpCommandSchema>;
