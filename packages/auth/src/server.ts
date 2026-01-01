import { db } from "@packages/db";
import * as authSchema from "@packages/db/schemas/auth";
import { env } from "@packages/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      users: authSchema.usersTable,
      accounts: authSchema.accountsTable,
      sessions: authSchema.sessionsTable,
      verifications: authSchema.verificationsTable,
    },
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [env.WEB_URL],
});
