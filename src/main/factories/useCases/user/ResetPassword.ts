import { ResetPassword } from '@/data/useCases/users/ResetPassword';
import { BcryptAdapter } from '@/infra/criptograpgy/bcrypt/BcryptAdapter';
import UserRepository from '@/infra/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '@/infra/typeorm/repositories/UserTokenRepository';
import HashConfig from '@/main/config/hash';

export const makeResetPassword = (): ResetPassword => {
  const bcryptAdapter = new BcryptAdapter(HashConfig.bcrypt.salt);
  const userTokenRepository = new UserTokenRepository();
  const userRepository = new UserRepository();

  return new ResetPassword(userTokenRepository, userRepository, bcryptAdapter);
};
