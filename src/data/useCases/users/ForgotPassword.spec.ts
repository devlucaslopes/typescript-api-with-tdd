import { FakeUserRepository } from '@/data/protocols/database/users/fakes/FakeUserRepository';
import { FakeUserTokenRepository } from '@/data/protocols/database/users/fakes/FakeUserTokenRepository';
import { FakeMailProvider } from '@/providers/mail/fakes/FakeMailProvider';
import { ForgotPassword } from './ForgotPassword';

let fakeMailProvider: FakeMailProvider;
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
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeUserRepository = new FakeUserRepository();
    forgotPassword = new ForgotPassword(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeMailProvider,
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

  it('should calls MailProvider.send with correct value', async () => {
    const sendSpy = jest.spyOn(fakeMailProvider, 'send');

    fakeUserRepository.create(fakeUserData());

    await forgotPassword.execute('any_email@mail.com');

    expect(sendSpy).toHaveBeenCalledWith({
      to: {
        name: 'any_name',
        email: 'any_email@mail.com',
      },
      subject: '[Calculadora BC] - Esqueci minha senha',
      templateData: {
        file: 'forgot_password',
        variables: {
          name: 'any_name',
          link: `${process.env.APP_WEB_URI}?token=valid_token`,
        },
      },
    });
  });

  it('should returns user name on success', async () => {
    fakeUserRepository.create(fakeUserData());

    const response = await forgotPassword.execute('any_email@mail.com');

    expect(response).toBe('any_name');
  });
});
