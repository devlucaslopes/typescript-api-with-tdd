import { FakeUserRepository } from '@/data/protocols/database/users/fakes/FakeUserRepository';
import { ForgotPassword } from './ForgotPassword';

let fakeUserRepository: FakeUserRepository;
let forgotPassword: ForgotPassword;

const fakeUserData = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

describe('# ForgotPassword', () => {
  beforeAll(() => {
    fakeUserRepository = new FakeUserRepository();
    forgotPassword = new ForgotPassword(fakeUserRepository);
  });

  it('should calls UserRepository.findByEmail with correct email', async () => {
    const findByEmail = jest.spyOn(fakeUserRepository, 'findByEmail');

    await forgotPassword.execute('any_email@mail.com');

    expect(findByEmail).toHaveBeenCalledWith('any_email@mail.com');
  });
});
