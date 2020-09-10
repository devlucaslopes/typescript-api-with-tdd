import { Router } from 'express';
import { makeSignUpController } from '../factories/controllers/user/SignUpControllerFactory';

const signUpRouter = Router();
const signUpController = makeSignUpController();

signUpRouter.post('/', signUpController.handle);

export default signUpRouter;
