import { TypeORMHelper } from '../helpers/TypeORMHelper';
import UserRepository from './UserRepository';

let userRepository: UserRepository;

describe('# UserRepository', () => {
  beforeAll(async () => {
    await TypeORMHelper.connect();
    userRepository = new UserRepository();
  });

  afterAll(async () => {
    await TypeORMHelper.disconnect();
  });

  beforeEach(async () => {
    await TypeORMHelper.clear();
  });

  it('should create a new user', async () => {
    const user = await userRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(user.id).toBeTruthy();
    expect(user.name).toBe('any_name');
    expect(user.email).toBe('any_email@mail.com');
  });

  it('should returns user find by email address', async () => {
    const user = await userRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    const userExists = await userRepository.findByEmail(user.email);

    expect(userExists?.id).toBeTruthy();
    expect(userExists?.name).toBe('any_name');
    expect(userExists?.email).toBe('any_email@mail.com');
  });

  it('should returns undefined if user not found', async () => {
    const userExists = await userRepository.findByEmail('any_email@mail.com');

    expect(userExists).toBeUndefined();
  });
});
