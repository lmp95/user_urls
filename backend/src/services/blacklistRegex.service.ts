import { BlacklistRegexInterface } from '../interfaces/blacklistRegex.interface';
import BlacklistRegexModel from '../models/blacklistRegex.model';

/**
 * Add or update blacklist regex
 * @param {regexFormat} regexFormat
 * @returns {Promise<BlacklistRegexInterface>}
 */
const addBlacklistRegex = async (
  blacklist: BlacklistRegexInterface
): Promise<BlacklistRegexInterface> => {
  const blacklistRegexList = await BlacklistRegexModel.find();
  if (blacklistRegexList.length <= 0) {
    return await BlacklistRegexModel.create(blacklist);
  }
  return await BlacklistRegexModel.findOneAndUpdate(
    { _id: blacklistRegexList[0]._id },
    { regexFormat: blacklist.regexFormat },
    { new: true }
  );
};

/**
 * get blacklist regex
 * @returns {Promise<BlacklistRegexInterface>}
 */
const getBlacklistRegex = async (): Promise<BlacklistRegexInterface> => {
  const result = await BlacklistRegexModel.find();
  return result[0];
};

export const BlacklistRegexService = {
  addBlacklistRegex,
  getBlacklistRegex,
};
