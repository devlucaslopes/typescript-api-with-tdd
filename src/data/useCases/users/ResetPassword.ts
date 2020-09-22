import { IHasher } from '@/data/protocols/cryptography/Hasher';
import { IUserRepository } from '@/data/protocols/database/users/UserRepository';
import { IUserTokenRepository } from '@/data/protocols/database/users/UserTokenRepository';
import { IUser } from '@/domain/entities/User';
import {
  IResetPassword,
  IResetPasswordDTO,
} from '@/domain/useCases/users/ResetPassword';

export class ResetPassword implements IResetPassword {
  constructor(
    private readonly userTokenRepository: IUserTokenRepository,
    private readonly userRepository: IUserRepository,
    private readonly hasher: IHasher,
  ) {}

  async execute({
    token,
    password,
  }: IResetPasswordDTO): Promise<IUser | undefined> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      return undefined;
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      return undefined;
    }

    const passwordHashed = await this.hasher.hash(password);

    user.password = passwordHashed;

    await this.userRepository.save(user);

    return Promise.resolve({
      id: 'iasdd',
      name: 'lucas',
      email: 'lucas@mgial.com',
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}
