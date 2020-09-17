import { TypeORMHelper } from '../helpers/TypeORMHelper';
import { UserTokenRepository } from './UserTokenRepository';

let userTokenRepository: UserTokenRepository;

describe('# UserTokenRepository', () => {
  beforeAll(async () => {
    await TypeORMHelper.connect();
    userTokenRepository = new UserTokenRepository();
  });

  afterAll(async () => {
    await TypeORMHelper.disconnect();
  });

  beforeEach(async () => {
    await TypeORMHelper.clear();
  });

  it('should create a new user token', async () => {
    const userToken = await userTokenRepository.create('any_id');

    expect(userToken.id).toBeTruthy();
    expect(userToken.token).toBeTruthy();
    expect(userToken.user_id).toBe('any_id');
  });
});
