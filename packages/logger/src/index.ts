import { env } from "@packages/env/server";
import type { Logger } from "winston";
import winston from "winston";
import { colors } from "./options/colors";
import { consoleFormat, format } from "./options/format";
import { level, levels } from "./options/levels";

winston.addColors(colors);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: env.NODE_ENV === "production" ? format : consoleFormat,
  }),
];

if (env.LOG_FILE) {
  transports.push(
    // export error logs to a file
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format,
    }),
    // export all logs to a file
    new winston.transports.File({
      filename: "logs/combined.log",
      format,
    }),
  );
}

const exceptionHandlers = env.LOG_FILE
  ? [new winston.transports.File({ filename: "logs/exceptions.log" })]
  : undefined;

const rejectionHandlers = env.LOG_FILE
  ? [new winston.transports.File({ filename: "logs/rejections.log" })]
  : undefined;

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
  ...(exceptionHandlers && { exceptionHandlers }),
  ...(rejectionHandlers && { rejectionHandlers }),
});

if (env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export type { Logger };
export { logger };
