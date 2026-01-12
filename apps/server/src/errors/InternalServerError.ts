import { RFC9457Error } from "@packages/shared/RFC9457Error";
import type { Context } from "hono";

export class InternalServerError extends RFC9457Error {
  constructor(err: RFC9457Error | Error, c: Context) {
    const isProduction = process.env.NODE_ENV === "production";

    super({
      type: "https://httpstatus.es/500",
      title: "Internal Server Error",
      status: 500,
      detail: isProduction
        ? "Something went wrong. Please try again later."
        : err.message,
      instance: c.req.path,
    });
  }
}
