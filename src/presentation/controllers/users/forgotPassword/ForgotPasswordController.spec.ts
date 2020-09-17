import { FakeUserRepository } from '@/data/protocols/database/users/fakes/FakeUserRepository';
import { FakeUserTokenRepository } from '@/data/protocols/database/users/fakes/FakeUserTokenRepository';
import { ForgotPassword } from '@/data/useCases/users/ForgotPassword';
import { InvalidCredentialError } from '@/presentation/errors/InvalidCredentialError';
import { badRequest, success } from '@/presentation/helpers/HttpHelper';
import { FakeMailProvider } from '@/providers/mail/fakes/FakeMailProvider';
import { ForgotPasswordController } from './ForgotPasswordController';

let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeUserRepository: FakeUserRepository;
let fakeForgotPassword: ForgotPassword;
let forgotPasswordController: ForgotPasswordController;

describe('# ForgotPasswordController', () => {
  beforeAll(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeUserRepository = new FakeUserRepository();

    fakeForgotPassword = new ForgotPassword(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeMailProvider,
    );
    forgotPasswordController = new ForgotPasswordController(fakeForgotPassword);
  });

  it('should calls ForgotPassword.execute with correct email', async () => {
    const executeSpy = jest.spyOn(fakeForgotPassword, 'execute');

    await forgotPasswordController.handle({
      body: { email: 'any_email@mail.com' },
    });

    expect(executeSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('should returns badRequest if forgotPassword.execute return undefined', async () => {
    const response = await forgotPasswordController.handle({
      body: { email: 'any_email@mail.com' },
    });

    expect(response).toEqual(badRequest(new InvalidCredentialError()));
  });

  it('should returns message on success', async () => {
    fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
    });

    const response = await forgotPasswordController.handle({
      body: { email: 'any_email@mail.com' },
    });

    expect(response).toEqual(success({ name: 'any_name' }));
  });
});
