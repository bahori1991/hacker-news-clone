import type { Session, User } from "better-auth";
import { auth } from "./auth";
import { authClient } from "./client";
import { loginSchema } from "./schema";

export { auth, authClient, loginSchema, type Session, type User };
