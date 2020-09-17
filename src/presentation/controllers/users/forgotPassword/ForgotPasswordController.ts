import { ForgotPassword } from '@/data/useCases/users/ForgotPassword';
import { InvalidCredentialError } from '@/presentation/errors/InvalidCredentialError';
import { badRequest } from '@/presentation/helpers/HttpHelper';
import { IController } from '@/presentation/protocols/controller';
import { IRequest, IResponse } from '@/presentation/protocols/http';

export class ForgotPasswordController implements IController {
  constructor(private readonly forgotPassword: ForgotPassword) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { email } = request.body;

    const name = await this.forgotPassword.execute(email);

    if (!name) {
      return badRequest(new InvalidCredentialError());
    }

    return Promise.resolve({ statusCode: 200, body: { name } });
  }
}
