// /src/error/ErrorResponse.ts

import { CustomError } from "./CustomError";

export class ErrorResponse {
  public readonly status: number;
  public readonly message: string;
  public readonly code: string;

  constructor(error: unknown) {
    if (error instanceof CustomError) {
      this.status = error.status;
      this.message = error.message;
      this.code = error.code;
    } else if (error instanceof Error) {
      this.status = 500;
      this.message = error.message;
      this.code = 'E999';
    } else {
      this.status = 500;
      this.message = '알 수 없는 오류 발생';
      this.code = 'E999';
    }
  }
}