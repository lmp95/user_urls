import { Router } from 'express';
import { BlackListRegexController } from '../controllers/blacklistRegex.controller';

const blacklistRouter = Router();

blacklistRouter
  .route('/')
  .get(BlackListRegexController.getBlacklistRegex)
  .post(BlackListRegexController.addBlacklistRegex);

export default blacklistRouter;
