import { FakeHasher } from '@/data/protocols/cryptography/fakes/FakeHasher';
import { FakeUserRepository } from '@/data/protocols/database/users/fakes/FakeUserRepository';
import { FakeUserTokenRepository } from '@/data/protocols/database/users/fakes/FakeUserTokenRepository';
import { ResetPassword } from '@/data/useCases/users/ResetPassword';
import { ResetPasswordController } from './ResetPasswordController';

let fakeHasher: FakeHasher;
let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPassword;
let resetPasswordController: ResetPasswordController;

describe('# ResetPasswordController', () => {
  beforeAll(() => {
    fakeHasher = new FakeHasher();
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    resetPassword = new ResetPassword(
      fakeUserTokenRepository,
      fakeUserRepository,
      fakeHasher,
    );

    resetPasswordController = new ResetPasswordController(resetPassword);
  });

  it('should calls ResetPassword.execute with correct values', async () => {
    const executeSpy = jest.spyOn(resetPassword, 'execute');

    await resetPasswordController.handle({
      body: {
        token: 'valid_token',
        password: 'new_password',
      },
    });

    expect(executeSpy).toHaveBeenCalledWith({
      token: 'valid_token',
      password: 'new_password',
    });
  });
});
