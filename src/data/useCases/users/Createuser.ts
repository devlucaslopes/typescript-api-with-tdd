import {
  ICreateUser,
  ICreateUserDTO,
} from '@/domain/useCases/users/CreateUser';
import { IUser } from '@/domain/entities/User';
import { IUserRepository } from '@/data/protocols/database/users/UserRepository';

export class CreateUser implements ICreateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<IUser> {
    const { name, email, password, passwordConfirmation } = data;

    if (password !== passwordConfirmation) {
      throw new Error('This passwords not match');
    }

    const emailAlreadyUsed = await this.userRepository.findByEmail(email);

    if (emailAlreadyUsed) {
      throw new Error('This email already used');
    }

    const user = await this.userRepository.create({ name, email, password });

    return user;
  }
}
