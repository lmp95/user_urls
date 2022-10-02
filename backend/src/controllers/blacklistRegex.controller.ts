import { NextFunction, Request, Response } from 'express';
import { BlacklistRegexService } from '../services/blacklistRegex.service';

const addBlacklistRegex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blacklist = await BlacklistRegexService.addBlacklistRegex(req.body);
    res.send(blacklist);
  } catch (error) {
    next(error);
  }
};

const getBlacklistRegex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blacklist = await BlacklistRegexService.getBlacklistRegex();
    res.send(blacklist);
  } catch (error) {
    next(error);
  }
};

export const BlackListRegexController = {
  addBlacklistRegex,
  getBlacklistRegex,
};
