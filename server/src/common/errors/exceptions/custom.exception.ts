import { HttpException } from '@nestjs/common';

import { ErrorCode } from './error-codes';
import { ErrorMap } from './error-map';

export class CustomException extends HttpException {
  constructor(code: ErrorCode, customMessage?: string) {
    const { status, message } = ErrorMap[code];

    super(
      {
        success: false,
        code,
        message: customMessage ?? message,
      },
      status
    );
  }
}
