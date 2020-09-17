import { IDecrypter } from '@/data/protocols/cryptography/Decrypter';
import { AccessDeniedError } from '../errors/AccessDeniedError';
import { InvalidAccessTokenError } from '../errors/InvalidAccessTokenError';
import { forbidden, success } from '../helpers/HttpHelper';
import { IRequest, IResponse } from '../protocols/http';
import { IMiddleware } from '../protocols/middleware';

export class EnsureAuthenticated implements IMiddleware {
  constructor(private readonly decrypter: IDecrypter) {}

  async handle(request: IRequest): Promise<IResponse> {
    const authorizationHeader = request.headers?.authorization;

    if (!authorizationHeader) {
      return forbidden(new AccessDeniedError());
    }

    const [, token] = authorizationHeader.split('Bearer ');

    if (!token) {
      return forbidden(new InvalidAccessTokenError());
    }

    const userId = await this.decrypter.decrypt(token);

    if (!userId) {
      return forbidden(new InvalidAccessTokenError());
    }

    return success({ userId });
  }
}
