import { env } from "@packages/env/server";

export type ProblemDetails = {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  code?: string;
  [key: string]: unknown;
};

/**
 * RFC9457ErrorResponse is a base class for all RFC 9457 error responses.
 * It implements the Problem Details for HTTP APIs (RFC 9457) specification.
 * @see https://www.rfc-editor.org/rfc/rfc9457
 */
export class RFC9457Error extends Error {
  public readonly code: string;
  public readonly type: string;
  public readonly title: string;
  public readonly status: number;
  public readonly detail?: string;
  public readonly instance?: string;
  public readonly extensions?: Record<string, unknown>;

  constructor(props: {
    code: string;
    message: string;
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
    extensions?: Record<string, unknown>;
  }) {
    super(props.message);
    this.name = this.constructor.name;
    this.code = props.code;

    // default values of RFC 9457
    const baseUrl = env.SERVER_URL ?? "https://api.example.com";
    this.type =
      props.type ??
      `${baseUrl}/problems/${props.code.toLowerCase().replace(/_/g, "-")}`;
    this.title = props.title ?? this.constructor.name;
    this.status = props.status ?? 400;
    this.detail = props.detail ?? props.message;
    this.instance = props.instance;
    this.extensions = props.extensions;
  }

  public toProblemDetails(): ProblemDetails {
    return {
      type: this.type,
      title: this.title,
      status: this.status,
      detail: this.detail,
      instance: this.instance,
      code: this.code,
      ...this.extensions,
    };
  }
}
