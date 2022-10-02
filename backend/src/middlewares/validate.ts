import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UserInterface } from '../interfaces/user.interface';
import { BlacklistRegexService } from '../services/blacklistRegex.service';
import ApiError from '../utils/apiError';

const callback =
  (req, resolve, reject) => async (err, user: UserInterface, info: Error) => {
    if (err || info || !user) {
      return reject(new ApiError(401, 'Unauthorized'));
    }
    req.user = user;
    resolve();
  };

export const authValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      callback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

export const checkBlacklist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blacklist = await BlacklistRegexService.getBlacklistRegex();
  try {
    if (blacklist.regexFormat !== '') {
      const regex = new RegExp(blacklist.regexFormat);
      if (regex.test(res.locals.shortCode)) {
        throw new ApiError(400, 'Blacklisted url');
      }
    }
    res.redirect(302, res.locals.fullUrl);
  } catch (error) {
    next(error);
  }
};
