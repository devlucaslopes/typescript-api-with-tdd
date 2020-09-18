import { ForgotPasswordController } from '@/presentation/controllers/users/forgotPassword/ForgotPasswordController';
import { makeForgotPassword } from '../../useCases/user/ForgotPassword';

export const makeForgotPasswordController = (): ForgotPasswordController => {
  return new ForgotPasswordController(makeForgotPassword());
};
