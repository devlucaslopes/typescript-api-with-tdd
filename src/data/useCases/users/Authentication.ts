import { IUserRepository } from '@/data/protocols/database/users/UserRepository';
import {
  IAuthentication,
  IAuthenticationDTO,
} from '@/domain/useCases/users/Authentication';

export class Authentication implements IAuthentication {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticationDTO): Promise<string | undefined> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return undefined;
    }

    return Promise.resolve('string');
  }
}
