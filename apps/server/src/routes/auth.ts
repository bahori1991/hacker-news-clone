import { auth } from "@packages/auth/server";
import { Hono } from "hono";
import type { Context } from "../app";
import { authUser } from "../middlewares/authUser";

export const authRoutes = new Hono<Context>()
  .get("/user", authUser, async (c) => {
    const user = c.get("user");
    return c.json({ user });
  })
  .on(["GET", "POST"], "/*", (c) => auth.handler(c.req.raw));
