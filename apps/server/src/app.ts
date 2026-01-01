import { auth } from "@packages/auth/server";
import type { ErrorResponse } from "@packages/shared/types";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import type { Context } from "./context";
import { corsMiddleware } from "./middlewares/cors";
import { authRoutes } from "./routes/auth";
import { postsRoutes } from "./routes/posts";

const app = new Hono<Context>();

app.use("*", corsMiddleware(), async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session || !session.user) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("session", session.session);
  c.set("user", session.user);
  return next();
});

const routes = app
  .basePath("/api")
  .route("/auth", authRoutes)
  .route("/posts", postsRoutes);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    const errResponse =
      err.res ??
      c.json<ErrorResponse>(
        {
          success: false,
          error: err.message,
          isFormError:
            err.cause && typeof err.cause === "object" && "form" in err.cause
              ? err.cause.form === true
              : false,
        },
        err.status,
      );
    return errResponse;
  }

  return c.json<ErrorResponse>(
    {
      success: false,
      error:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : (err.stack ?? err.message),
    },
    500,
  );
});

export default app;
export type ApiRoutes = typeof routes;
