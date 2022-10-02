import { NextFunction, Request, Response } from 'express';
import { UrlService } from '../services/url.service';

/**
 * Generate full url into short
 */
const generateShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UrlService.generateShortUrl(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Validate short url and redirect to original
 */
const redirectUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UrlService.retriveFullUrl(req.params.shortCode);
    res.locals.fullUrl = result;
    res.locals.shortCode = req.params.shortCode;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Get list of user urls
 */
const getUrlList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UrlService.getUserUrls(
      req.query.sort,
      req.query.filter,
      req.query.page,
      req.query.pageSize
    );
    res.send(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete url by Id
 */
const deleteUrlById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UrlService.deleteUrlById(req.params.id);
    res.status(410).send(result);
  } catch (error) {
    next(error);
  }
};

export const urlController = {
  generateShortUrl,
  redirectUrl,
  getUrlList,
  deleteUrlById,
};
