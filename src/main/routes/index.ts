import { Router } from 'express';
import signUpRouter from '@/main/routes/SignUp';

const routes = Router();

routes.use('/signup', signUpRouter);

export default routes;
