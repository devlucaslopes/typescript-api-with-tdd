import jwt from 'jsonwebtoken';

import authConfig from '@/main/config/auth';
import { JWTAdapter } from './JWTAdapter';

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
    jwtAdapter = new JWTAdapter(authConfig.jwt.secret);
  });

  describe('encrypt()', () => {
    it('should calls jsonwebtoken.sign with correct value', async () => {
      const signSpy = jest.spyOn(jwt, 'sign');

      await jwtAdapter.encrypt('any_id');

      expect(signSpy).toHaveBeenCalledWith('any_id', authConfig.jwt.secret);
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

      expect(verifySpy).toHaveBeenCalledWith(
        'any_token',
        authConfig.jwt.secret,
      );
    });

    it('should return user data on verify success', async () => {
      const response = await jwtAdapter.decrypt('any_id');

      expect(response).toBe('any_value');
    });
  });
});
