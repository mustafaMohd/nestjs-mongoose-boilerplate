import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import httpStatus from 'http-status';
import { ConfigService } from 'src/config/config.service';
@Injectable()
export class ErrorhandlerMiddleware {
  constructor(readonly configService: ConfigService) {}
  use(err: any, req: any, res: any) {
    let { statusCode, message } = err;
    const configEnv = this.configService.get('APP_ENV');
    if (configEnv === 'production' && !err.isOperational) {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
      code: statusCode,
      message,
      ...(configEnv === 'development' && { stack: err.stack }),
    };

    if (configEnv === 'development') {
      Logger.error(err);
    }

    res.status(statusCode).send(response);
  }
}
