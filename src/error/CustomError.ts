// /src/error/CustomError.ts
import { ErrorCode } from "./ErrorCode";

export class CustomError extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(errorCode: ErrorCode, detail?: string) {
    super(detail ? `${errorCode.message}: ${detail}` : errorCode.message);
    this.name = 'CustomError';
    this.code = errorCode.code;
    this.status = errorCode.status;
  }
}