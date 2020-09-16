import { FakeEncrypter } from '@/data/protocols/cryptography/fakes/FakeEncrypter';
import { FakeHasher } from '@/data/protocols/cryptography/fakes/FakeHasher';
import { FakeUserRepository } from '@/data/protocols/database/users/fakes/FakeUserRepository';
import { AuthenticateUser } from '@/data/useCases/users/AuthenticateUser';
import { InvalidCredentialError } from '@/presentation/errors/InvalidCredentialError';
import {
  badRequest,
  serverError,
  success,
} from '@/presentation/helpers/HttpHelper';
import { AuthenticationController } from './AuthenticationController';

let fakeEncrypter: FakeEncrypter;
let fakeHasher: FakeHasher;
let fakeUserRepository: FakeUserRepository;
let authentication: AuthenticateUser;
let authenticationController: AuthenticationController;

const makeFakeRequest = () => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password',
  },
});

describe('# AuthenticationController', () => {
  beforeAll(() => {
    fakeEncrypter = new FakeEncrypter();
    fakeHasher = new FakeHasher();
    fakeUserRepository = new FakeUserRepository();

    authentication = new AuthenticateUser(
      fakeUserRepository,
      fakeHasher,
      fakeEncrypter,
    );

    authenticationController = new AuthenticationController(authentication);
  });

  it('should calls Authentication.execute with correct values', async () => {
    const authenticationSPy = jest.spyOn(authentication, 'execute');

    await authenticationController.handle(makeFakeRequest());

    expect(authenticationSPy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  it('should returns 400 if user not found', async () => {
    const response = await authenticationController.handle(makeFakeRequest());

    expect(response).toEqual(badRequest(new InvalidCredentialError()));
  });

  it('should returns 400 if invalid password provided', async () => {
    await fakeUserRepository.create({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    });

    jest
      .spyOn(fakeHasher, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));

    const response = await authenticationController.handle({
      body: {
        email: 'valid_email@mail.com',
        password: 'wrong_password',
      },
    });

    expect(response).toEqual(badRequest(new InvalidCredentialError()));
  });

  it('should returns access token on success', async () => {
    const response = await authenticationController.handle({
      body: {
        email: 'valid_email@mail.com',
        password: 'valid_password',
      },
    });

    expect(response).toEqual(
      success({ token: 'any_token', name: 'valid_name' }),
    );
  });

  it('should returns 500 if Authentication.execute throws', async () => {
    jest.spyOn(authentication, 'execute').mockImplementationOnce(async () => {
      return Promise.reject(new Error());
    });

    const response = await authenticationController.handle(makeFakeRequest());

    expect(response).toEqual(serverError(new Error()));
  });
});
