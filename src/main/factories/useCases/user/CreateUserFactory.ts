import { CreateUser } from '@/data/useCases/users/CreateUser';
import UserRepository from '@/infra/typeorm/repositories/UserRepository';
import { BcryptAdapter } from '@/infra/criptograpgy/bcrypt/BcryptAdapter';

export const makeCreateUser = (): CreateUser => {
  const SALT = 12;
  const bcryptAdapter = new BcryptAdapter(SALT);
  const userRepository = new UserRepository();

  return new CreateUser(userRepository, bcryptAdapter);
};
