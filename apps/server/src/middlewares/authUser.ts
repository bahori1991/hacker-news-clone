import { userController } from "@packages/ddd/main/User";
import { createMiddleware } from "hono/factory";
import type { Context } from "../app";

export const authUser = createMiddleware<Context>(async (c, next) => {
  try {
    const user = await userController.getAuthUser(c.req.raw.headers);
    c.set("user", user);
  } catch {
    c.set("user", null);
  } finally {
    await next();
  }
});
