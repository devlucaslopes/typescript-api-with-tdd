import MockDate from 'mockdate';

import { FakeHasher } from '@/data/protocols/cryptography/fakes/FakeHasher';
import { FakeUserRepository } from '@/data/protocols/database/users/fakes/FakeUserRepository';
import { FakeUserTokenRepository } from '@/data/protocols/database/users/fakes/FakeUserTokenRepository';
import { ResetPassword } from './ResetPassword';

let fakeHasher: FakeHasher;
let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPassword;

describe('# ResetPassword', () => {
  beforeAll(() => {
    MockDate.set(new Date());

    fakeHasher = new FakeHasher();
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    resetPassword = new ResetPassword(
      fakeUserTokenRepository,
      fakeUserRepository,
      fakeHasher,
    );
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should calls UserTokenRepository.findByToken with correct value', async () => {
    const findByTokenSpy = jest.spyOn(fakeUserTokenRepository, 'findByToken');

    await resetPassword.execute({
      token: 'any_token',
      password: 'any_password',
    });

    expect(findByTokenSpy).toHaveBeenCalledWith('any_token');
  });

  it('should returns undefined if user not found by token', async () => {
    const response = await resetPassword.execute({
      token: 'any_token',
      password: 'any_password',
    });

    expect(response).toBeUndefined();
  });

  it('should calls UserRepository.findById with correct value', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    fakeUserTokenRepository.create(user.id);

    const findByIdSpy = jest.spyOn(fakeUserRepository, 'findById');

    await resetPassword.execute({
      token: 'valid_token',
      password: 'any_password',
    });

    expect(findByIdSpy).toHaveBeenCalledWith('any_id');
  });

  it('should return undefined if  UserRepository.findById not found user', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    fakeUserTokenRepository.create(user.id);

    jest
      .spyOn(fakeUserRepository, 'findById')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const response = await resetPassword.execute({
      token: 'valid_token',
      password: 'any_password',
    });

    expect(response).toBeUndefined();
  });

  it('should calls Hasher.hash with correct value', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    fakeUserTokenRepository.create(user.id);

    const hashSpy = jest.spyOn(fakeHasher, 'hash');

    await resetPassword.execute({
      token: 'valid_token',
      password: 'new_password',
    });

    expect(hashSpy).toHaveBeenCalledWith('new_password');
  });

  it('should calls UserRepository.save with correct values', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    fakeUserTokenRepository.create(user.id);

    const saveSpy = jest.spyOn(fakeUserRepository, 'save');

    await resetPassword.execute({
      token: 'valid_token',
      password: 'new_password',
    });

    expect(saveSpy).toHaveBeenCalledWith({
      ...user,
      password: 'hashed_value',
    });
  });

  it('should returns user with new password on success', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    fakeUserTokenRepository.create(user.id);

    const response = await resetPassword.execute({
      token: 'valid_token',
      password: 'new_password',
    });

    expect(response).toEqual({
      ...user,
      password: 'hashed_value',
    });
  });
});
