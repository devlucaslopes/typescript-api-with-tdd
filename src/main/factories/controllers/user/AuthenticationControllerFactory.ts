import { AuthenticationController } from '@/presentation/controllers/users/authentication/AuthenticationController';
import { makeAuthentication } from '../../useCases/user/AuthenticationFactory';

export const makeAuthenticationController = (): AuthenticationController => {
  return new AuthenticationController(makeAuthentication());
};
