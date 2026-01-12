import "reflect-metadata";
import app from "@apps/server/app";
import { env } from "@packages/env/server";

Bun.serve({
  port: new URL(env.SERVER_URL).port,
  fetch: app.fetch,
});

console.log(`Server is running on ${env.SERVER_URL}`);
