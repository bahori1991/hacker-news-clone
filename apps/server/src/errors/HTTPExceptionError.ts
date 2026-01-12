import { RFC9457Error } from "@packages/shared/RFC9457Error";
import type { Context } from "hono";
import type { HTTPException } from "hono/http-exception";

export class HTTPExceptionError extends RFC9457Error {
  constructor(err: HTTPException, c: Context) {
    super({
      type: `https://httpstatus.es/${err.status}`,
      title: err.message || "HTTP Exception",
      status: err.status,
      detail: err.message,
      instance: c.req.path,
    });
  }
}
