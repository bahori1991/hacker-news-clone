import { dirname, resolve } from "node:path";
import { createEnv } from "@t3-oss/env-core";
import { fileURLToPath } from "bun";
import { config } from "dotenv";
import z from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, "../.env") });

const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;
const database = process.env.POSTGRES_DB;

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    WEB_URL: z.url(),
    SERVER_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    LOG_FILE: z.boolean().default(false),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  runtimeEnvStrict: {
    DATABASE_URL: `postgresql://${user}:${password}@${host}:${port}/${database}`,
    LOG_FILE: process.env.LOG_FILE ?? false,
    WEB_URL: process.env.WEB_URL,
    SERVER_URL: process.env.SERVER_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV ?? "development",
  },
  emptyStringAsUndefined: true,
});
