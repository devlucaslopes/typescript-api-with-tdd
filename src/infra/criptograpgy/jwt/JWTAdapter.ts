import { sign } from 'jsonwebtoken';

import { IEncrypter } from '@/data/protocols/cryptography/Encrypter';

export class JWTAdapter implements IEncrypter {
  constructor(private readonly secret: string) {}

  async encrypt(id: string): Promise<string> {
    const token = await sign(id, this.secret);

    return token;
  }
}
