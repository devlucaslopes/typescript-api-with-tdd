import { Router } from 'express';
import { makeAuthenticationController } from '../../factories/controllers/user/AuthenticationControllerFactory';
import { adaptRoute } from '../../adapters/express-routes-adapter';

const authenticationRouter = Router();

authenticationRouter.post('/', adaptRoute(makeAuthenticationController()));

export default authenticationRouter;
