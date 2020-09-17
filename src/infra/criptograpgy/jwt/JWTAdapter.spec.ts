import jwt from 'jsonwebtoken';

import { JWTAdapter } from './JWTAdapter';

const SECRET = 'secret';
let jwtAdapter: JWTAdapter;

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return new Promise(resolve => resolve('any_token'));
  },

  async verify(): Promise<string> {
    return new Promise(resolve => resolve('any_value'));
  },
}));

describe('# JWT Adapter', () => {
  beforeAll(() => {
    jwtAdapter = new JWTAdapter(SECRET);
  });

  describe('encrypt()', () => {
    it('should calls jsonwebtoken.sign with correct value', async () => {
      const signSpy = jest.spyOn(jwt, 'sign');

      await jwtAdapter.encrypt('any_id');

      expect(signSpy).toHaveBeenCalledWith('any_id', SECRET);
    });

    it('should return a token on sign success', async () => {
      const response = await jwtAdapter.encrypt('any_id');

      expect(response).toBe('any_token');
    });
  });

  describe('decrypt()', () => {
    it('should calls jsonwebtoken.verify with correct value', async () => {
      const verifySpy = jest.spyOn(jwt, 'verify');

      await jwtAdapter.decrypt('any_token');

      expect(verifySpy).toHaveBeenCalledWith('any_token', SECRET);
    });

    it('should return user data on verify success', async () => {
      const response = await jwtAdapter.decrypt('any_id');

      expect(response).toBe('any_value');
    });
  });
});
