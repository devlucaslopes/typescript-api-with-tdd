import { FakeUserTokenRepository } from '@/data/protocols/database/users/fakes/FakeUserTokenRepository';
import { ResetPassword } from './ResetPassword';

let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPassword;

describe('# ResetPassword', () => {
  beforeAll(() => {
    fakeUserTokenRepository = new FakeUserTokenRepository();
    resetPassword = new ResetPassword(fakeUserTokenRepository);
  });

  it('should calls UserTokenRepository.findByToken with correct value', async () => {
    const findByTokenSpy = jest.spyOn(fakeUserTokenRepository, 'findByToken');

    await resetPassword.execute({
      token: 'any_token',
      password: 'any_password',
    });

    expect(findByTokenSpy).toHaveBeenCalledWith('any_token');
  });
});
