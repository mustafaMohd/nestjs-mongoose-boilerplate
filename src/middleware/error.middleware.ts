import mongoose from 'mongoose';
import httpStatus from 'http-status';
//const config = require('../config/config');

import { ConfigService } from 'src/config/config.service';
import { ApiError } from 'src/utils/ApiError';
import { Logger } from '@nestjs/common';
// import logger from '../config/logger';
// import ApiError from '../utils/ApiError';

// export class ErrorMiddleware {
//   static configService: any;
//   constructor(readonly configService: ConfigService) {}

//   static errorConverter(err, req, res, next) {
//     let error = err;
//     if (!(error instanceof ApiError)) {
//       const statusCode =
//         error.statusCode || error instanceof mongoose.Error
//           ? httpStatus.BAD_REQUEST
//           : httpStatus.INTERNAL_SERVER_ERROR;
//       const message = error.message || httpStatus[statusCode];
//       error = new ApiError(statusCode, message, false, err.stack);
//     }
//     next(error);
//   }
//   public static errorHandler(err, req, res, next) {
//     let { statusCode, message } = err;
//     const configEnv = this.configService.get('APP_ENV');
//     if (configEnv === 'production' && !err.isOperational) {
//       statusCode = httpStatus.INTERNAL_SERVER_ERROR;
//       message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
//     }

//     res.locals.errorMessage = err.message;

//     const response = {
//       code: statusCode,
//       message,
//       ...(configEnv === 'development' && { stack: err.stack }),
//     };

//     if (configEnv === 'development') {
//       Logger.error(err);
//     }

//     res.status(statusCode).send(response);
//   }
// }

export function errorConverter(err, req, res, next) {
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

export function errorHandler(err, req, res, next) {
  const { statusCode, message } = err;
  // if (pro.env === 'production' && !err.isOperational) {
  //   statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  //   message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  // }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...{ stack: err.stack },
  };

  // if (config.env === 'development') {
  //   Logger.error(err);
  // }

  res.status(statusCode).send(response);
}

// export = {
//   errorConverter,
//   errorHandler,
// };
