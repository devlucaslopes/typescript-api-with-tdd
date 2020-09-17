import { IRequest, IResponse } from './http';

export interface IMiddleware {
  handle: (httpRequest: IRequest) => Promise<IResponse>;
}
