export interface ApiResponse<T = unknown> {
  statusCode: number;
  data?: T;
  message?: string;
}

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}
