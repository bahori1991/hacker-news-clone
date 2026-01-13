import { env } from "@packages/env/client";
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: env.VITE_WEB_URL,
});
