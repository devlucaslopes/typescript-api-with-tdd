import { IHasher } from '../Hasher';

export class FakeHasher implements IHasher {
  async hash(value: string): Promise<string> {
    return 'hashed_value';
  }
}
