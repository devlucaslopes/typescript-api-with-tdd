import { Router } from 'express';
import { makeForgotPasswordController } from '../../factories/controllers/user/ForgotPasswordControllerFactory';
import { adaptRoute } from '../../adapters/express-routes-adapter';

const forgotPasswordRouter = Router();

forgotPasswordRouter.post('/', adaptRoute(makeForgotPasswordController()));

export default forgotPasswordRouter;
