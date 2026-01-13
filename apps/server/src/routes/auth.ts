import { getUser } from "@apps/server/middlewares/getUser";
import { auth } from "@packages/auth/server";
import { Hono } from "hono";
import type { Context } from "../app";

export const authRoutes = new Hono<Context>()
  .get("/user", getUser, async (c) => c.json({ user: c.get("user") }))
  .on(["GET", "POST"], "/*", (c) => auth.handler(c.req.raw));
