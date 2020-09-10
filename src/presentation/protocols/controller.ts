import { IRequest, IResponse } from './http';

export interface IController {
  handle: (request: IRequest) => Promise<IResponse>;
}
