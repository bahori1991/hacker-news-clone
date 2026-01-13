import { userController } from "@packages/ddd/main/User";
import { createMiddleware } from "hono/factory";
import type { Context } from "../app";

export const getUser = createMiddleware<Context>(async (c, next) => {
  const user = await userController.getAuthUser(c.req.raw.headers);
  c.set("user", user);
  await next();
});
