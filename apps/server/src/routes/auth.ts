import { auth } from "@packages/auth/server";
import type { User } from "@packages/auth/types";
import type { SuccessResponse } from "@packages/shared/types";
import { Hono } from "hono";
import type { Context } from "../context";
import { loggedIn } from "../middlewares/loggedIn";

export const authRoutes = new Hono<Context>()
  .get("/user", loggedIn, async (c) => {
    const user = c.get("user") as User;
    return c.json<SuccessResponse<{ username: string }>>({
      success: true,
      message: "User fetched successfully",
      data: {
        username: user.name,
      },
    });
  })
  .on(["GET", "POST"], "/*", (c) => auth.handler(c.req.raw));
