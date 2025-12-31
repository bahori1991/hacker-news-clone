import { createEnv } from "@t3-oss/env-core";
import z from "zod";
import { getDatabaseUrl } from "./db";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    WEB_URL: z.url(),
    SERVER_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  runtimeEnvStrict: {
    DATABASE_URL: getDatabaseUrl(),
    WEB_URL: process.env.WEB_URL,
    SERVER_URL: process.env.SERVER_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV ?? "development",
  },
  emptyStringAsUndefined: true,
});
