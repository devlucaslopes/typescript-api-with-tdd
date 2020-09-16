import bcrypt from 'bcrypt';
import { IHasher } from '@/data/protocols/cryptography/Hasher';

export class BcryptAdapter implements IHasher {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt);

    return hashedValue;
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
