import supertest from 'supertest';
import { TypeORMHelper } from '@/infra/typeorm/helpers/TypeORMHelper';
import UserRepository from '@/infra/typeorm/repositories/UserRepository';
import { hash } from 'bcrypt';
import { UserTokenRepository } from '@/infra/typeorm/repositories/UserTokenRepository';

let request: supertest.SuperTest<supertest.Test>;

describe('# ResetPassword route', () => {
  beforeAll(async () => {
    await TypeORMHelper.connect();
    const { app } = await import('@/main/config/app');

    request = supertest(app);
  });

  afterAll(async () => {
    await TypeORMHelper.disconnect();
  });

  beforeEach(async () => {
    await TypeORMHelper.clear();
  });

  it('should return 200 on success', async () => {
    const hashedPassword = await hash('123456', 12);

    const userData = {
      name: 'lucas',
      email: 'lucas@mail.com',
      password: hashedPassword,
    };

    const userRepository = new UserRepository();

    const user = await userRepository.create(userData);

    const userTokenRepository = new UserTokenRepository();

    const userToken = await userTokenRepository.create(user.id);

    await request
      .post('/reset-password')
      .send({
        token: userToken.token,
        password: '123456',
      })
      .expect(200);
  });
});
