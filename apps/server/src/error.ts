// import { RFC9457Error } from "@packages/shared/RFC9457Error";
// import type { Context } from "hono";
// import { HTTPException } from "hono/http-exception";
// import type { ContentfulStatusCode } from "hono/utils/http-status";

// export function errorHandler(err: Error, c: Context): Response {
//   if (err instanceof HTTPException) {
//     const problem: ProblemDetails = {
//       type: `https://httpstatus.es/${err.status}`,
//       title: err.message || "HTTP Exception",
//       status: err.status,
//       detail: err.message,
//       instance: c.req.path,
//     };

//     if (
//       err.cause &&
//       typeof err.cause === "object" &&
//       "form" in err.cause &&
//       err.cause.form === true
//     ) {
//       problem.isFormError = true;
//     }

//     return c.json<ProblemDetails>(problem, err.status, {
//       "Content-Type": "application/problem+json",
//     });
//   }

//   if (err instanceof DomainError) {
//     const problem: ProblemDetails = err.toProblemDetails();
//     problem.instance = c.req.path;

//     return c.json<ProblemDetails>(problem, err.status as ContentfulStatusCode, {
//       "Content-Type": "application/problem+json",
//     });
//   }

//   // other errors
//   const problem: ProblemDetails = {
//     type: "https://httpstatus.es/500",
//     title: "Internal Server Error",
//     status: 500,
//     detail:
//       process.env.NODE_ENV === "production"
//         ? "Internal Server Error"
//         : (err.stack ?? err.message),
//     instance: c.req.path,
//   };

//   return c.json<ProblemDetails>(problem, 500, {
//     "Content-Type": "application/problem+json",
//   });
// }
