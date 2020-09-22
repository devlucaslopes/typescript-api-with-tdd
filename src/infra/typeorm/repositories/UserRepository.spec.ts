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

  describe('create()', () => {
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
  });

  describe('save()', () => {
    it('should save a user', async () => {
      const user = await userRepository.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      });

      user.password = 'new_password';

      const updatedUser = await userRepository.save(user);

      expect(updatedUser.id).toBe(user.id);
      expect(updatedUser.password).toBe('new_password');
    });
  });

  describe('findByEmail()', () => {
    it('should returns undefined if user not found', async () => {
      const userExists = await userRepository.findByEmail('any_email@mail.com');

      expect(userExists).toBeUndefined();
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
  });

  describe('findById()', () => {
    it('should returns user find by id', async () => {
      const user = await userRepository.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      });

      const userExists = await userRepository.findById(user.id);

      expect(userExists?.id).toBe(user.id);
      expect(userExists?.name).toBe('any_name');
      expect(userExists?.email).toBe('any_email@mail.com');
    });

    it('should returns undefined if user not found', async () => {
      const userExists = await userRepository.findById(
        'df7ca51e-66ce-4cf0-9fb1-4a82ad64acef',
      );

      expect(userExists).toBeUndefined();
    });
  });
});
