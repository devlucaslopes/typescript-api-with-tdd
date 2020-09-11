import { Router } from 'express';
import { makeSignUpController } from '../factories/controllers/user/SignUpControllerFactory';
import { adaptRoute } from '../adapters/express-routes-adapter';

const signUpRouter = Router();

signUpRouter.post('/', adaptRoute(makeSignUpController()));

export default signUpRouter;
