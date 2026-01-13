import { env } from "@packages/env/server";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schemas",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
