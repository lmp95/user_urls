import { Router } from 'express';
import authRouter from './auth.route';
import blacklistRouter from './blacklist.route';
import urlRouter from './url.route';
import userRouter from './user.route';

const appRouter = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/blacklist',
    route: blacklistRouter,
  },
  {
    path: '',
    route: urlRouter,
  },
];

defaultRoutes.forEach((route) => {
  appRouter.use(route.path, route.route);
});

export default appRouter;
