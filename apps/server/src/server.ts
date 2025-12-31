import { env } from "@packages/env/server";
import app from "./app";

Bun.serve({
  port: new URL(env.SERVER_URL).port,
  fetch: app.fetch,
});

console.log(`Server is running on ${env.SERVER_URL}`);
