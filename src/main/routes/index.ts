import { Router } from 'express';
import signUpRouter from '@/main/routes/SignUp.routes';

const routes = Router();

routes.use('/signup', signUpRouter);

export default routes;
