import { FakeDecrypter } from '@/data/protocols/cryptography/fakes/FakeDecrypter';
import { AccessDeniedError } from '../errors/AccessDeniedError';
import { InvalidAccessTokenError } from '../errors/InvalidAccessTokenError';
import { forbidden, success } from '../helpers/HttpHelper';
import { EnsureAuthenticated } from './EnsureAuthenticated';

let fakeDecrypter: FakeDecrypter;
let ensureAuthenticated: EnsureAuthenticated;

describe('# EnsureAuthenticated', () => {
  beforeAll(() => {
    fakeDecrypter = new FakeDecrypter();
    ensureAuthenticated = new EnsureAuthenticated(fakeDecrypter);
  });

  it('should returns 403 if authorization header not provided', async () => {
    const response = await ensureAuthenticated.handle({});

    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  it('should returns 403 if access token is invalid', async () => {
    const response = await ensureAuthenticated.handle({
      headers: {
        authorization: 'invalid_token',
      },
    });

    expect(response).toEqual(forbidden(new InvalidAccessTokenError()));
  });

  it('should calls Decrypter.decrypt with correct values', async () => {
    const decryptSpy = jest.spyOn(fakeDecrypter, 'decrypt');

    await ensureAuthenticated.handle({
      headers: { authorization: 'Bearer any_token' },
    });

    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  it('should returns userId on success', async () => {
    const response = await ensureAuthenticated.handle({
      headers: { authorization: 'Bearer any_token' },
    });

    expect(response).toEqual(success({ userId: 'any_id' }));
  });

  it('should returns 400 if userId is undefined', async () => {
    jest
      .spyOn(fakeDecrypter, 'decrypt')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const response = await ensureAuthenticated.handle({
      headers: { authorization: 'Bearer any_token' },
    });

    expect(response).toEqual(forbidden(new InvalidAccessTokenError()));
  });
});
