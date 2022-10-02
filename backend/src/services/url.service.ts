import { UrlInterface } from '../interfaces/url.interface';
import { isUri } from 'valid-url';
import ApiError from '../utils/apiError';
import { addDays, generateUrlCode } from '../utils/utils';
import UrlModel from '../models/url.mode';
import { config } from 'dotenv';
import NodeCache from 'node-cache';

config();

const cache = new NodeCache({
  stdTTL: parseInt(process.env.CACHE_TTL),
  checkperiod: 120,
});
/**
 * generate url shortener
 * @param {string} data
 * @returns {Promise<UrlInterface>}
 */
const generateShortUrl = async (data: any): Promise<UrlInterface> => {
  if (!isUri(data.fullUrl)) throw new ApiError(400, 'Invalid url');
  const newUrl: UrlInterface = {
    fullUrl: data.fullUrl,
    shortCode: await generateUrlCode(),
    expiry: addDays(parseInt(data.expiry)),
    numberOfHits: 0,
  };
  return await UrlModel.create(newUrl);
};

/**
 * Redirect short code to full url
 * @param {shortCode} shortCode
 * @returns {Promise<string>}
 */
const retriveFullUrl = async (shortCode: string): Promise<string> => {
  // check cache exists
  let url: any;
  if (cache.has(shortCode)) {
    return cache.get(shortCode);
  } else {
    url = await UrlModel.findOne({ shortCode: shortCode });
    // cache url
    cache.set(shortCode, url.fullUrl);
    if (!url) {
      throw new ApiError(400, 'Url not found');
    }
  }
  await UrlModel.updateOne(
    { _id: url._id },
    { numberOfHits: url.numberOfHits + 1 }
  );
  return url.fullUrl;
};

/**
 * Get all user urls
 * @param {sort} sort
 * @param {filter} filter
 * @param {page} page
 * @param {pageSize} pageSize
 * @returns {Promise<UrlInterface[]>}
 */
const getUserUrls = async (
  sort?: string | any,
  filter?: string | any,
  page?: number | any,
  pageSize?: number | any
) => {
  let sortBy: any = { _id: -1 };
  const keyword = filter ? { fullUrl: { $regex: filter } } : {};
  if (sort) {
    sortBy = { [sort]: -1 };
  }
  return await UrlModel.find(keyword)
    .skip(Math.floor(page * pageSize))
    .limit(pageSize)
    .sort(sortBy);
};

/**
 *
 * @param {id} id
 * @returns {Promise<UrlInterface>}
 */
const deleteUrlById = async (id: string): Promise<UrlInterface> => {
  const url = await UrlModel.findById(id);
  if (!url) throw new ApiError(400, 'Fail to delete url');
  const result = await UrlModel.deleteOne({ _id: id });
  if (result.deletedCount <= 0) throw new ApiError(400, 'Fail to delete url');
  return url;
};

export const UrlService = {
  generateShortUrl,
  retriveFullUrl,
  getUserUrls,
  deleteUrlById,
};
