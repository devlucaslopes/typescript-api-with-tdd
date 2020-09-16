import { AuthenticateUser } from '@/data/useCases/users/AuthenticateUser';
import UserRepository from '@/infra/typeorm/repositories/UserRepository';
import { BcryptAdapter } from '@/infra/criptograpgy/bcrypt/BcryptAdapter';
import { JWTAdapter } from '@/infra/criptograpgy/jwt/JWTAdapter';

export const makeAuthentication = (): AuthenticateUser => {
  const SECRET = 'secret';
  const jwtAdapter = new JWTAdapter(SECRET);

  const SALT = 12;
  const bcryptAdapter = new BcryptAdapter(SALT);

  const userRepository = new UserRepository();

  return new AuthenticateUser(userRepository, bcryptAdapter, jwtAdapter);
};
