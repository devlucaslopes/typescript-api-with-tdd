import { IUserRepository } from '@/data/protocols/database/users/UserRepository';
import {
  IAuthentication,
  IAuthenticationDTO,
} from '@/domain/useCases/users/Authentication';

export class Authentication implements IAuthentication {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email, password }: IAuthenticationDTO): Promise<string> {
    await this.userRepository.findByEmail({ email, password });

    return Promise.resolve('string');
  }
}
