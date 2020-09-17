import { IUserToken } from '@/domain/entities/UserToken';
import { IUserTokenRepository } from '../UserTokenRepository';

export class FakeUserTokenRepository implements IUserTokenRepository {
  async create(userId: string): Promise<IUserToken> {
    return {
      id: 'valid_id',
      user_id: 'valid_user_id',
      token: 'valid_token',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
