import jwt from 'jsonwebtoken';

import { JWTAdapter } from './JWTAdapter';

const SECRET = 'secret';
let jwtAdapter: JWTAdapter;

describe('# JWT Adapter', () => {
  beforeAll(() => {
    jwtAdapter = new JWTAdapter(SECRET);
  });

  it('should calls jsonwebtoken.sign with correct value', async () => {
    const signSpy = jest.spyOn(jwt, 'sign');

    await jwtAdapter.encrypt('any_id');

    expect(signSpy).toHaveBeenCalledWith('any_id', SECRET);
  });
});
