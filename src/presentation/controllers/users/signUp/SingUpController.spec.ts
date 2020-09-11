import { FakeUserRepository } from '@/data/protocols/database/users/fake/FakeUserRepository';
import { CreateUser } from '@/data/useCases/users/CreateUser';
import { SignUpController } from './SignUpController';

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
    fakeUserRepository = new FakeUserRepository();
    createUser = new CreateUser(fakeUserRepository);
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

  it('should returns 200 and a new user on success', async () => {
    const { body, statusCode } = await signUpController.handle(
      makeFakeRequest(),
    );

    expect(statusCode).toBe(200);
    expect(body.name).toBe('any_name');
  });

  it('should throw if password not match', async () => {
    const { body, statusCode } = await signUpController.handle({
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'wrong_password',
      },
    });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message');
  });
});
