import { JWTAdapter } from '@/infra/criptograpgy/jwt/JWTAdapter';
import { EnsureAuthenticated } from '@/presentation/middlewares/EnsureAuthenticated';
import { IMiddleware } from '@/presentation/protocols/middleware';

export const makeEnsureAuthenticated = (): IMiddleware => {
  const SECRET = 'secret';
  const decrypter = new JWTAdapter(SECRET);

  return new EnsureAuthenticated(decrypter);
};
