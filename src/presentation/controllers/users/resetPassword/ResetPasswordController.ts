import { ResetPassword } from '@/data/useCases/users/ResetPassword';
import { InvalidResetTokenError } from '@/presentation/errors/InvalidResetTokenError';
import { ServerError } from '@/presentation/errors/ServerError';
import {
  badRequest,
  serverError,
  success,
} from '@/presentation/helpers/HttpHelper';
import { IController } from '@/presentation/protocols/controller';
import { IRequest, IResponse } from '@/presentation/protocols/http';

export class ResetPasswordController implements IController {
  constructor(private readonly resetPassword: ResetPassword) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { token, password } = request.body;

      const user = await this.resetPassword.execute({ token, password });

      if (!user) {
        return badRequest(new InvalidResetTokenError());
      }

      return success(user);
    } catch (error) {
      return serverError(new ServerError(error));
    }
  }
}
