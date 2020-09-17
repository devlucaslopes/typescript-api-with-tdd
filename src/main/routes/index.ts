import { Router } from 'express';
import signUpRouter from '@/main/routes/users/signUp';
import authenticationRouter from '@/main/routes/users/authentication';

const routes = Router();

routes.use('/signup', signUpRouter);
routes.use('/auth', authenticationRouter);

export default routes;
