import { FakeEncrypter } from '@/data/protocols/cryptography/fakes/FakeEncrypter';
import { FakeHasher } from '@/data/protocols/cryptography/fakes/FakeHasher';
import { FakeUserRepository } from '@/data/protocols/database/users/fakes/FakeUserRepository';
import { IAuthenticateUser } from '@/domain/useCases/users/AuthenticateUser';
import { AuthenticateUser } from './AuthenticateUser';

let fakeEncrypter: FakeEncrypter;
let fakeHasher: FakeHasher;
let fakeUserRepository: FakeUserRepository;
let authentication: IAuthenticateUser;

const makeFakeUser = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_value',
});

const makeFakeRequest = () => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

describe('# Authentication use case', () => {
  beforeAll(() => {
    fakeEncrypter = new FakeEncrypter();
    fakeHasher = new FakeHasher();
    fakeUserRepository = new FakeUserRepository();
    authentication = new AuthenticateUser(
      fakeUserRepository,
      fakeHasher,
      fakeEncrypter,
    );
  });

  it('should calls UserRepositoy.findByEmail with correct email', async () => {
    const findByEmailSpy = jest.spyOn(fakeUserRepository, 'findByEmail');

    await authentication.execute(makeFakeRequest());

    expect(findByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('should return undefined if user not found', async () => {
    const response = await authentication.execute(makeFakeRequest());

    expect(response).toBeUndefined();
  });

  it('should throw if UserRepository.findByEmail throws', async () => {
    jest
      .spyOn(fakeUserRepository, 'findByEmail')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const promise = authentication.execute(makeFakeRequest());

    await expect(promise).rejects.toThrow();
  });

  it('should calls Hasher.compare with correct value', async () => {
    fakeUserRepository.create(makeFakeUser());

    const compareSpy = jest.spyOn(fakeHasher, 'compare');

    await authentication.execute(makeFakeRequest());

    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_value');
  });

  it('should returns undefined if Hasher.compare fails', async () => {
    fakeUserRepository.create(makeFakeUser());

    jest
      .spyOn(fakeHasher, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));

    const response = await authentication.execute(makeFakeRequest());

    expect(response).toBeUndefined();
  });

  it('should throw if Hasher.compare throws', async () => {
    jest
      .spyOn(fakeHasher, 'compare')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const promise = authentication.execute(makeFakeRequest());

    await expect(promise).rejects.toThrow();
  });

  it('should calls Encrypter.encrypt with correct value', async () => {
    fakeUserRepository.create(makeFakeUser());

    const encryptSpy = jest.spyOn(fakeEncrypter, 'encrypt');

    await authentication.execute(makeFakeRequest());

    expect(encryptSpy).toHaveBeenCalledWith('any_id');
  });

  it('should throw if Encrypter.encrypt throws', async () => {
    jest
      .spyOn(fakeEncrypter, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const promise = authentication.execute(makeFakeRequest());

    await expect(promise).rejects.toThrow();
  });

  it('should returns access token and username on success', async () => {
    fakeUserRepository.create(makeFakeUser());

    const response = await authentication.execute(makeFakeRequest());

    expect(response).toEqual({ token: 'any_token', name: 'any_name' });
  });
});
