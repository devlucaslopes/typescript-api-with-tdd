import { IUserTokenRepository } from '@/data/protocols/database/users/UserTokenRepository';
import {
  IResetPassword,
  IResetPasswordDTO,
} from '@/domain/useCases/users/ResetPassword';

export class ResetPassword implements IResetPassword {
  constructor(private readonly userTokenRepository: IUserTokenRepository) {}

  async execute({ token, password }: IResetPasswordDTO): Promise<void> {
    await this.userTokenRepository.findByToken(token);
  }
}
