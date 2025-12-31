import { env } from "@packages/env/server";
import { cors } from "hono/cors";

export function corsMiddleware() {
  return cors({
    origin: [env.WEB_URL],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  });
}
