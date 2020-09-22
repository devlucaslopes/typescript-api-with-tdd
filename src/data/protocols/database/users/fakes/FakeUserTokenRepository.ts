import { IUserToken } from '@/domain/entities/UserToken';
import { IUserTokenRepository } from '../UserTokenRepository';

export class FakeUserTokenRepository implements IUserTokenRepository {
  private userTokens: IUserToken[] = [];

  async create(userId: string): Promise<IUserToken> {
    const userToken = {
      id: 'valid_id',
      user_id: userId,
      token: 'valid_token',
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByToken(token: string): Promise<IUserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}
