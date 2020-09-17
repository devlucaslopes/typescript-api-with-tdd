import { Request, Response, NextFunction } from 'express';

import { IMiddleware } from '@/presentation/protocols/middleware';
import { IRequest } from '@/presentation/protocols/http';

export const adaptMiddlware = (middleware: IMiddleware) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const httpRequest: IRequest = {
      headers: req.headers,
    };

    const httpResponse = await middleware.handle(httpRequest);

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
