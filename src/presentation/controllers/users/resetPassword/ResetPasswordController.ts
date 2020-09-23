import { ResetPassword } from '@/data/useCases/users/ResetPassword';
import { IController } from '@/presentation/protocols/controller';
import { IRequest, IResponse } from '@/presentation/protocols/http';

export class ResetPasswordController implements IController {
  constructor(private readonly resetPassword: ResetPassword) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { token, password } = request.body;

    await this.resetPassword.execute({ token, password });

    return { statusCode: 200, body: {} };
  }
}
