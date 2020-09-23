import { Router } from 'express';
import { makeResetPasswordController } from '@/main/factories/controllers/user/ResetPasswordControllerFactory';
import { adaptRoute } from '../../adapters/express-routes-adapter';

const resetPasswordRouter = Router();

resetPasswordRouter.post('/', adaptRoute(makeResetPasswordController()));

export default resetPasswordRouter;
