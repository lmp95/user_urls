import mongoose, { Schema } from 'mongoose';
import { BlacklistRegexInterface } from '../interfaces/blacklistRegex.interface';

const BlacklistRegexSchema = new Schema<BlacklistRegexInterface>(
  {
    regexFormat: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const BlacklistRegexModel = mongoose.model(
  'BlacklistRegex',
  BlacklistRegexSchema
);
export default BlacklistRegexModel;
