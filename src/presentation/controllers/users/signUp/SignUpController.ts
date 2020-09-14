import { IController } from '@/presentation/protocols/controller';
import { IRequest, IResponse } from '@/presentation/protocols/http';
import { CreateUser } from '@/data/useCases/users/CreateUser';
import { EmailInUseError } from '@/presentation/errors/EmailInUseError';
import {
  badRequest,
  serverError,
  success,
} from '@/presentation/helpers/HttpHelper';

export class SignUpController implements IController {
  constructor(private readonly createUser: CreateUser) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { name, email, password, passwordConfirmation } = request.body;

      const user = await this.createUser.execute({
        name,
        email,
        password,
        passwordConfirmation,
      });

      if (!user) {
        return badRequest(new EmailInUseError());
      }

      return success(user);
    } catch (error) {
      return serverError(error);
    }
  }
}
