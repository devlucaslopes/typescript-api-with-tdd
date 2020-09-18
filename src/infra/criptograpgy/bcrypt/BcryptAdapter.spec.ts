import bcrypt from 'bcrypt';

import HashConfig from '@/main/config/hash';
import { BcryptAdapter } from './BcryptAdapter';

let bcryptAdapter: BcryptAdapter;

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hashed_value');
  },

  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

describe('# BcryptAdapter', () => {
  beforeEach(() => {
    bcryptAdapter = new BcryptAdapter(HashConfig.bcrypt.salt);
  });

  describe('hash()', () => {
    it('should be calls Bcrypt.hash with correct value', async () => {
      const hashSpy = jest.spyOn(bcrypt, 'hash');

      await bcryptAdapter.hash('any_value');

      expect(hashSpy).toHaveBeenCalledWith('any_value', HashConfig.bcrypt.salt);
    });

    it('should returns hashed value on success', async () => {
      const hashedValue = await bcryptAdapter.hash('any_value');

      expect(hashedValue).toBe('hashed_value');
    });
  });

  describe('compare()', () => {
    it('should be calls Bcrypt.compare with correct value', async () => {
      const compareSpy = jest.spyOn(bcrypt, 'compare');

      await bcryptAdapter.compare('any_value', 'any_hashed');

      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hashed');
    });

    test('should return false when compare fails', async () => {
      jest
        .spyOn(bcrypt, 'compare')
        .mockReturnValueOnce(new Promise(resolve => resolve(false)));

      const response = await bcryptAdapter.compare('any_value', 'any_hash');

      expect(response).toBe(false);
    });
  });
});
