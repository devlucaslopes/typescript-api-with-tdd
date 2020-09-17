import { IUserTokenRepository } from '@/data/protocols/database/users/UserTokenRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

export class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async create(userId: string): Promise<UserToken> {
    return Promise.resolve({
      id: 'any_id',
      user_id: 'any_id',
      token: 'any_token',
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}
