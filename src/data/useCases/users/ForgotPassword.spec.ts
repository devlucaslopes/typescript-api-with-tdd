import { FakeUserRepository } from '@/data/protocols/database/users/fakes/FakeUserRepository';
import { FakeUserTokenRepository } from '@/data/protocols/database/users/fakes/FakeUserTokenRepository';
import { ForgotPassword } from './ForgotPassword';

let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeUserRepository: FakeUserRepository;
let forgotPassword: ForgotPassword;

const fakeUserData = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

describe('# ForgotPassword', () => {
  beforeAll(() => {
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeUserRepository = new FakeUserRepository();
    forgotPassword = new ForgotPassword(
      fakeUserRepository,
      fakeUserTokenRepository,
    );
  });

  it('should calls UserRepository.findByEmail with correct email', async () => {
    const findByEmail = jest.spyOn(fakeUserRepository, 'findByEmail');

    await forgotPassword.execute('any_email@mail.com');

    expect(findByEmail).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('should returns undefined if user not found', async () => {
    const response = await forgotPassword.execute('any_email@mail.com');

    expect(response).toBeUndefined();
  });

  it('should calls UserTokenRepository.create with correct value', async () => {
    fakeUserRepository.create(fakeUserData());

    const createSpy = jest.spyOn(fakeUserTokenRepository, 'create');

    await forgotPassword.execute('any_email@mail.com');

    expect(createSpy).toHaveBeenCalledWith('any_id');
  });
});
