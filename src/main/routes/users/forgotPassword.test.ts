import supertest from 'supertest';
import { TypeORMHelper } from '@/infra/typeorm/helpers/TypeORMHelper';
import UserRepository from '@/infra/typeorm/repositories/UserRepository';
import { hash } from 'bcrypt';

let request: supertest.SuperTest<supertest.Test>;

describe('# ForgotPassword route', () => {
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

    await userRepository.create(userData);

    await request
      .post('/forgot-password')
      .send({
        email: 'lucas@mail.com',
      })
      .expect(200);
  });

  it('should return 400 if user not found', async () => {
    await request
      .post('/forgot-password')
      .send({
        email: 'lucas@mail.com',
      })
      .expect(400);
  });
});
