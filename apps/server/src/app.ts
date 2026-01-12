import type { User } from "@packages/ddd/main/User";
import type { Env } from "hono";
import { Hono } from "hono";
import { corsMiddleware } from "./middlewares/cors";
import { authRoutes } from "./routes/auth";

export interface Context extends Env {
  Variables: { user: User | null };
}

const app = new Hono<Context>()
  .use("*", corsMiddleware())
  .basePath("/api")
  .route("/auth", authRoutes);

export default app;
