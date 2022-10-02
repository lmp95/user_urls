import { Router } from 'express';
import { urlController } from '../controllers/url.controller';
import { authValidation, checkBlacklist } from '../middlewares/validate';

const urlRouter = Router();

urlRouter
  .route('/url/generate')
  .post(authValidation, urlController.generateShortUrl);
urlRouter.route('/url/:id').delete(authValidation, urlController.deleteUrlById);
urlRouter.route('/url').get(authValidation, urlController.getUrlList);
urlRouter.route('/:shortCode').get(urlController.redirectUrl, checkBlacklist);

export default urlRouter;
