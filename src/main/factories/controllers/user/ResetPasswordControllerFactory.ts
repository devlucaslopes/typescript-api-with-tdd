import { ResetPasswordController } from '@/presentation/controllers/users/resetPassword/ResetPasswordController';
import { makeResetPassword } from '../../useCases/user/ResetPassword';

export const makeResetPasswordController = (): ResetPasswordController => {
  return new ResetPasswordController(makeResetPassword());
};
