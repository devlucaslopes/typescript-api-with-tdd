import { IEncrypter } from '@/data/protocols/cryptography/Encrypter';
import { IHasher } from '@/data/protocols/cryptography/Hasher';
import { IUserRepository } from '@/data/protocols/database/users/UserRepository';
import { IAuthentication } from '@/domain/entities/Authentication';
import {
  IAuthenticateUser,
  IAuthenticationDTO,
} from '@/domain/useCases/users/AuthenticateUser';

export class AuthenticateUser implements IAuthenticateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasher: IHasher,
    private readonly encrypter: IEncrypter,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticationDTO): Promise<IAuthentication | undefined> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return undefined;
    }

    const passwordIsValid = await this.hasher.compare(password, user.password);

    if (!passwordIsValid) {
      return undefined;
    }

    const token = await this.encrypter.encrypt(user.id);

    return { token, name: user.name };
  }
}
