import { TypeORMHelper } from '../helpers/TypeORMHelper';
import UserRepository from './UserRepository';
import { UserTokenRepository } from './UserTokenRepository';

let userTokenRepository: UserTokenRepository;
let userRepository: UserRepository;

describe('# UserTokenRepository', () => {
  beforeAll(async () => {
    await TypeORMHelper.connect();
    userTokenRepository = new UserTokenRepository();
    userRepository = new UserRepository();
  });

  afterAll(async () => {
    await TypeORMHelper.disconnect();
  });

  beforeEach(async () => {
    await TypeORMHelper.clear();
  });

  it('should create a new user token', async () => {
    const user = await userRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    const userToken = await userTokenRepository.create(user.id);

    expect(userToken.user_id).toBe(user.id);
  });
});
