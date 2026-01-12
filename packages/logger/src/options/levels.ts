import { env } from "@packages/env/server";

export const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
} as const;

export function level() {
  return env.NODE_ENV === "production" ? "warn" : "debug";
}
