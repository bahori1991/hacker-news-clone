import { HTTPExceptionError } from "@apps/server/errors/HTTPExceptionError";
import { InternalServerError } from "@apps/server/errors/InternalServerError";
import { logger } from "@packages/logger";
import { RFC9457Error } from "@packages/shared/RFC9457Error";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export function errorHandler(err: Error, c: Context): Response {
  const requestContext = {
    method: c.req.method,
    path: c.req.path,
    url: c.req.url,
    userAgent: c.req.header("user-agent"),
    ip: c.req.header("x-forwarded-for") || c.req.header("x-real-ip"),
    userId: c.get("user")?.id,
  };

  if (err instanceof HTTPException) {
    const problem = new HTTPExceptionError(err, c);

    // log the error with the logger
    problem.log(logger, { request: requestContext });

    return c.json<RFC9457Error>(problem, err.status, {
      "Content-Type": "application/problem+json",
    });
  }

  if (err instanceof RFC9457Error) {
    if (!err.status) {
      const problem = new InternalServerError(err, c);

      // log the error with the logger
      problem.log(logger, { request: requestContext });

      return c.json<RFC9457Error>(problem, 500, {
        "Content-Type": "application/problem+json",
      });
    }

    const errorResponse = new RFC9457Error({
      ...err,
      instance: c.req.path,
    });

    // log the error with the logger
    errorResponse.log(logger, { request: requestContext });

    return c.json<RFC9457Error>(
      errorResponse,
      errorResponse.status as ContentfulStatusCode,
      {
        "Content-Type": "application/problem+json",
      },
    );
  }

  // other errors
  const problem = new InternalServerError(err, c);

  // log the error with the logger
  problem.log(logger, {
    request: requestContext,
    originalError: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
  });

  return c.json<RFC9457Error>(problem, 500, {
    "Content-Type": "application/problem+json",
  });
}
