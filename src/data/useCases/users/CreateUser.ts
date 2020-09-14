import {
  ICreateUser,
  ICreateUserDTO,
} from '@/domain/useCases/users/CreateUser';
import { IUser } from '@/domain/entities/User';
import { IUserRepository } from '@/data/protocols/database/users/UserRepository';
import { IHasher } from '@/data/protocols/cryptography/Hasher';

export class CreateUser implements ICreateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasher: IHasher,
  ) {}

  async execute(data: ICreateUserDTO): Promise<IUser | undefined> {
    const { name, email, password } = data;

    const emailAlreadyUsed = await this.userRepository.findByEmail(email);

    if (emailAlreadyUsed) {
      return undefined;
    }

    const hashedPassword = await this.hasher.hash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
