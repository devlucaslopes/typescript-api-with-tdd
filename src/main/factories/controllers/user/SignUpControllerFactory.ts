import { SignUpController } from '@/presentation/controllers/users/signUp/SignUpController';
import { makeCreateUser } from '../../useCases/user/CreateUserFactory';

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeCreateUser());
};
