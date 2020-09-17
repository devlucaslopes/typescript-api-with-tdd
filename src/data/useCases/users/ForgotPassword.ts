import { IUserRepository } from '@/data/protocols/database/users/UserRepository';
import { IForgotPassword } from '@/domain/useCases/users/ForgotPassword';

export class ForgotPassword implements IForgotPassword {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<void> {
    await this.userRepository.findByEmail(email);
  }
}
