import { CreateUser } from '@/data/useCases/user/Createuser';
import UserRepository from '@/infra/typeorm/repositories/UserRepository';

export const makeCreateUser = (): CreateUser => {
  const userRepository = new UserRepository();
  return new CreateUser(userRepository);
};
