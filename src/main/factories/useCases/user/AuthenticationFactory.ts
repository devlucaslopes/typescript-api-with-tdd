import { AuthenticateUser } from '@/data/useCases/users/AuthenticateUser';
import UserRepository from '@/infra/typeorm/repositories/UserRepository';
import { BcryptAdapter } from '@/infra/criptograpgy/bcrypt/BcryptAdapter';
import { JWTAdapter } from '@/infra/criptograpgy/jwt/JWTAdapter';
import AuthConfig from '@/main/config/auth';
import HashConfig from '@/main/config/hash';

export const makeAuthentication = (): AuthenticateUser => {
  const jwtAdapter = new JWTAdapter(AuthConfig.jwt.secret);
  const bcryptAdapter = new BcryptAdapter(HashConfig.bcrypt.salt);

  const userRepository = new UserRepository();

  return new AuthenticateUser(userRepository, bcryptAdapter, jwtAdapter);
};
