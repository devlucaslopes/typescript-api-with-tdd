import bcrypt from 'bcryptjs';
import { IHasher } from '@/data/protocols/cryptography/Hasher';

export class BcryptAdapter implements IHasher {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    await bcrypt.hash(value, this.salt);
    return Promise.resolve('value');
  }
}
