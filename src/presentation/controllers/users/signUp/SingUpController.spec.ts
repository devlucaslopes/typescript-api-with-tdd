import { FakeUserRepository } from '@/data/protocols/database/users/fakes/FakeUserRepository';
import { CreateUser } from '@/data/useCases/users/CreateUser';
import { FakeHasher } from '@/data/protocols/cryptography/fakes/FakeHasher';
import { SignUpController } from './SignUpController';

let fakeHasher: FakeHasher;
let fakeUserRepository: FakeUserRepository;
let createUser: CreateUser;
let signUpController: SignUpController;

const makeFakeRequest = () => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

describe('# SignUp controller', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher();
    fakeUserRepository = new FakeUserRepository();
    createUser = new CreateUser(fakeUserRepository, fakeHasher);
    signUpController = new SignUpController(createUser);
  });

  it('should calls CreateUser.execute with correct values', async () => {
    const executeSpy = jest.spyOn(createUser, 'execute');

    await signUpController.handle(makeFakeRequest());

    expect(executeSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
    });
  });
});
