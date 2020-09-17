import { sign, verify } from 'jsonwebtoken';

import { IEncrypter } from '@/data/protocols/cryptography/Encrypter';
import { IDecrypter } from '@/data/protocols/cryptography/Decrypter';

export class JWTAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  async encrypt(id: string): Promise<string> {
    const token = await sign(id, this.secret);

    return token;
  }

  async decrypt(token: string): Promise<string> {
    const data: any = await verify(token, this.secret);

    return data;
  }
}
