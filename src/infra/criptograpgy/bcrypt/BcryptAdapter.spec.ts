import bcrypt from 'bcryptjs';

import { BcryptAdapter } from './BcryptAdapter';

const SALT = 12;
let bcryptAdapter: BcryptAdapter;

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
  });
});
