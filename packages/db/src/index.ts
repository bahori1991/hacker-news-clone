import { env } from "@packages/env/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { getISOFormatDateQuery } from "./libs/utils";
import * as authSchema from "./schemas/auth";
import * as commentsSchema from "./schemas/comments";
import * as postsSchema from "./schemas/posts";
import * as upvotesSchema from "./schemas/upvotes";

export * from "drizzle-orm";

export const schema = {
  ...authSchema,
  ...postsSchema,
  ...commentsSchema,
  ...upvotesSchema,
} as const;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, { schema });
export { getISOFormatDateQuery };
