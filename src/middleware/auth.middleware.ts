import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { authenticate } from 'passport';
import { roleRights } from '../config/roles';

const verifyCallback =
  (req, resolve, reject, requiredRights) => (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new HttpException('Please authenticate', HttpStatus.UNAUTHORIZED),
      );
    }

    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight),
      );

      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new HttpException('Forbidden', HttpStatus.FORBIDDEN));
      }
    }

    resolve();
  };

// export function auth (...requiredRights) => async (req, res, next) => {
//   return new Promise((resolve, reject) => {
//     passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
//   })
//     .then(() => next())
//     .catch((err) => next(err));
// };

export function auth(...requiredRights) {
  return async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights),
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };
}
