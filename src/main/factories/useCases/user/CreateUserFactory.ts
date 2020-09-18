import { CreateUser } from '@/data/useCases/users/CreateUser';
import UserRepository from '@/infra/typeorm/repositories/UserRepository';
import { BcryptAdapter } from '@/infra/criptograpgy/bcrypt/BcryptAdapter';
import HashConfig from '@/main/config/hash';

export const makeCreateUser = (): CreateUser => {
  const bcryptAdapter = new BcryptAdapter(HashConfig.bcrypt.salt);
  const userRepository = new UserRepository();

  return new CreateUser(userRepository, bcryptAdapter);
};
