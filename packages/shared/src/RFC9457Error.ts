import type { Logger } from "@packages/logger";

/**
 * RFC9457ErrorResponse is a base class for all RFC 9457 error responses.
 * It implements the Problem Details for HTTP APIs (RFC 9457) specification.
 * @see https://www.rfc-editor.org/rfc/rfc9457
 */
export class RFC9457Error extends Error {
  public readonly type: string;
  public readonly title: string;
  public readonly status?: number;
  public readonly detail?: string;
  public readonly instance?: string;
  public readonly custom?: Record<string, unknown>;

  constructor(props: {
    type: string;
    title: string;
    status?: number;
    detail?: string;
    instance?: string;
    custom?: Record<string, unknown>;
  }) {
    super(props.detail);
    this.type = props.type || "https://api/example.com/errors/general-error";
    this.title = props.title;
    this.status = props.status;
    this.detail = props.detail;
    this.instance = props.instance;
    this.custom = props.custom;
  }

  /**
   * Log the error with the logger
   * @param logger - winston logger instance
   * @param context - additional context information to log
   */
  public log(logger: Logger, context?: Record<string, unknown>): void {
    const logLevel = this.getLogLevel();
    const logData = this.getLogData(context);

    logger[logLevel](this.title, logData);
  }

  private getLogLevel(): "error" | "warn" | "info" {
    if (!this.status) return "error";
    if (this.status >= 500) return "error";
    if (this.status >= 400) return "warn";
    return "info";
  }

  private getLogData(
    context?: Record<string, unknown>,
  ): Record<string, unknown> {
    return {
      error: {
        name: this.name,
        message: this.message,
        type: this.type,
        status: this.status,
        title: this.title,
        detail: this.detail,
        instance: this.instance,
        ...(this.custom && { custom: this.custom }),
      },
      ...(context && { context }),
    };
  }
}
