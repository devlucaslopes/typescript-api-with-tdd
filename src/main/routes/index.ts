import { Router } from 'express';
import signUpRouter from '@/main/routes/users/signUp';

const routes = Router();

routes.use('/signup', signUpRouter);

export default routes;
