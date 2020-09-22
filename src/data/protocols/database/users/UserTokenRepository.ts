import { IUserToken } from '@/domain/entities/UserToken';

export interface IUserTokenRepository {
  create: (userId: string) => Promise<IUserToken>;

  findByToken: (token: string) => Promise<IUserToken | undefined>;
}
