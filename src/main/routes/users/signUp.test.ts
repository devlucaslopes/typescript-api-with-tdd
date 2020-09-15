import supertest from 'supertest';
import { TypeORMHelper } from '@/infra/typeorm/helpers/TypeORMHelper';
import UserRepository from '@/infra/typeorm/repositories/UserRepository';

let request: supertest.SuperTest<supertest.Test>;

describe('# SignUp route', () => {
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
    await request
      .post('/signup')
      .send({
        name: 'lucas',
        email: 'lucas@mail.com',
        password: '123456',
        passwordConfirmation: '123456',
      })
      .expect(200);
  });

  it('should return 400 if CreateUser.execute returns undefined', async () => {
    const userData = {
      name: 'lucas',
      email: 'lucas@mail.com',
      password: '123456',
      passwordConfirmation: '123456',
    };

    const userRepository = new UserRepository();
    await userRepository.create(userData);

    await request.post('/signup').send(userData).expect(400);
  });
});
