import { Injectable } from '@nestjs/common';
import { ApiError } from 'src/utils/ApiError';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
@Injectable()
export class ErrorConverterMiddleware {
  use(err: any, req: any, res: any, next: any) {
    let error = err;
    if (!(error instanceof ApiError)) {
      const statusCode =
        error.statusCode || error instanceof mongoose.Error
          ? httpStatus.BAD_REQUEST
          : httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || httpStatus[statusCode];
      error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
  }
}
