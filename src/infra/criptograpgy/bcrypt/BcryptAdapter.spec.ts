import bcrypt from 'bcrypt';

import { BcryptAdapter } from './BcryptAdapter';

const SALT = 12;
let bcryptAdapter: BcryptAdapter;

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hashed_value');
  },
}));

describe('# BcryptAdapter', () => {
  beforeEach(() => {
    bcryptAdapter = new BcryptAdapter(SALT);
  });

  describe('hash()', () => {
    it('should be calls Bcrypt.hash with correct value', async () => {
      const hashSpy = jest.spyOn(bcrypt, 'hash');

      await bcryptAdapter.hash('any_value');

      expect(hashSpy).toHaveBeenCalledWith('any_value', SALT);
    });

    it('should returns hashed value on success', async () => {
      const hashedValue = await bcryptAdapter.hash('any_value');

      expect(hashedValue).toBe('hashed_value');
    });
  });
});
