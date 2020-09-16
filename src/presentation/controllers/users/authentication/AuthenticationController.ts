import { AuthenticateUser } from '@/data/useCases/users/AuthenticateUser';
import { InvalidCredentialError } from '@/presentation/errors/InvalidCredentialError';
import {
  badRequest,
  serverError,
  success,
} from '@/presentation/helpers/HttpHelper';
import { IController } from '@/presentation/protocols/controller';
import { IRequest, IResponse } from '@/presentation/protocols/http';

export class AuthenticationController implements IController {
  constructor(private readonly authentication: AuthenticateUser) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { email, password } = request.body;

      const auth = await this.authentication.execute({
        email,
        password,
      });

      if (!auth?.token) {
        return badRequest(new InvalidCredentialError());
      }

      return success({ token: auth.token, name: auth.name });
    } catch (error) {
      return serverError(error);
    }
  }
}
