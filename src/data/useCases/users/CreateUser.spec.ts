import { FakeUserRepository } from '@/data/protocols/database/users/fakes/FakeUserRepository';
import { FakeHasher } from '@/data/protocols/cryptography/fakes/FakeHasher';
import { CreateUser } from './CreateUser';

let fakeHasher: FakeHasher;
let fakeUserRepository: FakeUserRepository;
let createUser: CreateUser;

const makeFakeRequest = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password',
});

describe('# CreateUser use case', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher();
    fakeUserRepository = new FakeUserRepository();
    createUser = new CreateUser(fakeUserRepository, fakeHasher);
  });

  it('should calls UserRepository.findByEmail with correct email', async () => {
    const findByEmailSpy = jest.spyOn(fakeUserRepository, 'findByEmail');

    await createUser.execute(makeFakeRequest());

    expect(findByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('should throw if UserRepository.findByEmail throws', async () => {
    jest
      .spyOn(fakeUserRepository, 'findByEmail')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const promise = createUser.execute(makeFakeRequest());

    await expect(promise).rejects.toThrow();
  });

  it('should returns null if UserRepository.findByEmail find a user', async () => {
    await createUser.execute(makeFakeRequest());

    const response = await createUser.execute(makeFakeRequest());

    expect(response).toBeUndefined();
  });

  it('should calls Hasher.hash with correct password', async () => {
    const hashSpy = jest.spyOn(fakeHasher, 'hash');

    await createUser.execute(makeFakeRequest());

    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });

  it('should calls UserRepository.create with correct values', async () => {
    const createSpy = jest.spyOn(fakeUserRepository, 'create');

    await createUser.execute(makeFakeRequest());

    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_value',
    });
  });

  it('should returns a new user on success', async () => {
    const response = await createUser.execute(makeFakeRequest());

    expect(response?.id).toBe('any_id');
    expect(response?.email).toBe('any_email@mail.com');
  });
});
