import { FakeDecrypter } from '@/data/protocols/cryptography/fakes/FakeDecrypter';
import { AccessDeniedError } from '../errors/AccessDeniedError';
import { forbidden, success } from '../helpers/HttpHelper';
import { EnsureAuthenticated } from './EnsureAuthenticated';

let fakeDecrypter: FakeDecrypter;
let ensureAuthenticated: EnsureAuthenticated;

describe('# EnsureAuthenticated', () => {
  beforeAll(() => {
    fakeDecrypter = new FakeDecrypter();
    ensureAuthenticated = new EnsureAuthenticated(fakeDecrypter);
  });

  it('should return 403 if authorization header not provided', async () => {
    const response = await ensureAuthenticated.handle({});

    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  it('should calls Decrypter.decrypt with correct values', async () => {
    const decryptSpy = jest.spyOn(fakeDecrypter, 'decrypt');

    await ensureAuthenticated.handle({
      headers: { authorization: 'any_token' },
    });

    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  it('should return userId on success', async () => {
    const response = await ensureAuthenticated.handle({
      headers: { authorization: 'any_token' },
    });

    expect(response).toEqual(success({ userId: 'any_id' }));
  });
});
