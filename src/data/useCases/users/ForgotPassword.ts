import { IUserRepository } from '@/data/protocols/database/users/UserRepository';
import { IUserTokenRepository } from '@/data/protocols/database/users/UserTokenRepository';
import { IForgotPassword } from '@/domain/useCases/users/ForgotPassword';

export class ForgotPassword implements IForgotPassword {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userTokenRepository: IUserTokenRepository,
  ) {}

  async execute(email: string): Promise<string | undefined> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return undefined;
    }

    await this.userTokenRepository.create(user.id);

    return email;
  }
}
