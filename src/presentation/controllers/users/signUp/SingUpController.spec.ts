import { FakeUserRepository } from '@/data/protocols/database/user/fake/FakeUserRepository';
import { SignUpController } from './SignUpController';

let fakeUserRepository: FakeUserRepository;
let signUpController: SignUpController;

const makeFakeRequest = () => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeFakeUser = () => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
  created_at: new Date(),
  updated_at: new Date(),
});

describe('# SignUp controller', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    signUpController = new SignUpController(fakeUserRepository);
  });

  it('should calls UserRepository.findByEmail with correct email', async () => {
    const findByEmailSpy = jest.spyOn(fakeUserRepository, 'findByEmail');

    await signUpController.handle(makeFakeRequest());

    expect(findByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('should returns 422 if UserRepository.findByEmail finds a user', async () => {
    jest
      .spyOn(fakeUserRepository, 'findByEmail')
      .mockImplementationOnce(async () => Promise.resolve(makeFakeUser()));

    const response = await signUpController.handle(makeFakeRequest());

    expect(response.statusCode).toBe(422);
  });

  it('should calls UserRepository.create with correct values', async () => {
    const createSpy = jest.spyOn(fakeUserRepository, 'create');

    await signUpController.handle(makeFakeRequest());

    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  it('should returns 200 and a new user on success', async () => {
    const { body, statusCode } = await signUpController.handle(
      makeFakeRequest(),
    );

    expect(statusCode).toBe(200);
    expect(body.name).toBe('any_name');
  });
});
