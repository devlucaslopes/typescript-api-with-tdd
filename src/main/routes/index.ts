import { Router } from 'express';
import signUpRouter from '@/main/routes/users/signUp';
import authenticationRouter from '@/main/routes/users/authentication';
import forgotPasswordRouter from './users/forgotPassword';

const routes = Router();

routes.use('/signup', signUpRouter);
routes.use('/auth', authenticationRouter);
routes.use('/forgot-password', forgotPasswordRouter);

export default routes;
