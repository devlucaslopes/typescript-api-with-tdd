import { Router } from 'express';
import signUpRouter from '@/main/routes/users/signUp';
import authenticationRouter from '@/main/routes/users/authentication';
import profileRouter from './users/profile';
import { adaptMiddlware } from '../adapters/express-middleware-adapter';
import { makeEnsureAuthenticated } from '../factories/middlewares/EnsureAuthenticated';

const routes = Router();

const ensureAuthenticated = adaptMiddlware(makeEnsureAuthenticated());

routes.use('/signup', signUpRouter);
routes.use('/auth', authenticationRouter);
routes.use('/profile', ensureAuthenticated, profileRouter);

export default routes;
