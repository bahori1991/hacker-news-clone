import { getDatabaseUrl } from "@packages/env/db";
import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: "../../.env" });

export default defineConfig({
  schema: "./src/schemas",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
