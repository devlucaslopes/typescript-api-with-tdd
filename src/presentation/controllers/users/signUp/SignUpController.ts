import { IUserRepository } from '@/data/protocols/database/user/UserRepository';
import { IController } from '@/presentation/protocols/controller';
import { IRequest, IResponse } from '@/presentation/protocols/http';

export class SignUpController implements IController {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    const { name, email, password } = body;

    const emailAlreadyUsed = await this.userRepository.findByEmail(email);

    if (emailAlreadyUsed) {
      return {
        statusCode: 422,
        body: {},
      };
    }

    const user = await this.userRepository.create({ name, email, password });

    return { statusCode: 200, body: user };
  }
}
