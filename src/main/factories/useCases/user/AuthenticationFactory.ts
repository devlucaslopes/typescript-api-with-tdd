import { Authentication } from '@/data/useCases/users/Authentication';
import UserRepository from '@/infra/typeorm/repositories/UserRepository';
import { BcryptAdapter } from '@/infra/criptograpgy/bcrypt/BcryptAdapter';
import { JWTAdapter } from '@/infra/criptograpgy/jwt/JWTAdapter';

export const makeAuthentication = (): Authentication => {
  const SECRET = 'secret';
  const jwtAdapter = new JWTAdapter(SECRET);

  const SALT = 12;
  const bcryptAdapter = new BcryptAdapter(SALT);

  const userRepository = new UserRepository();

  return new Authentication(userRepository, bcryptAdapter, jwtAdapter);
};
