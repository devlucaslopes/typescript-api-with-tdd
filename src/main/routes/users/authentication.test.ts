import supertest from 'supertest';
import { TypeORMHelper } from '@/infra/typeorm/helpers/TypeORMHelper';
import UserRepository from '@/infra/typeorm/repositories/UserRepository';
import { hash } from 'bcrypt';

let request: supertest.SuperTest<supertest.Test>;

describe('# Authentication route', () => {
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
      email: 'lucas1@mail.com',
      password: hashedPassword,
    };

    const userRepository = new UserRepository();

    await userRepository.create(userData);

    await request
      .post('/auth')
      .send({
        email: 'lucas1@mail.com',
        password: '123456',
      })
      .expect(200);
  });

  it('should return 400 if authentication fails', async () => {
    await request
      .post('/auth')
      .send({
        email: 'lucas@mail.com',
        password: '123456',
      })
      .expect(400);
  });
});
