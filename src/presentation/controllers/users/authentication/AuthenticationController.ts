import { Authentication } from '@/data/useCases/users/Authentication';
import { InvalidCredentialError } from '@/presentation/errors/InvalidCredentialError';
import { badRequest, success } from '@/presentation/helpers/HttpHelper';
import { IController } from '@/presentation/protocols/controller';
import { IRequest, IResponse } from '@/presentation/protocols/http';

export class AuthenticationController implements IController {
  constructor(private readonly authentication: Authentication) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { email, password } = request.body;

    const token = await this.authentication.execute({ email, password });

    if (!token) {
      return badRequest(new InvalidCredentialError());
    }

    return success({ token });
  }
}
