import { IDecrypter } from '../Decrypter';

export class FakeDecrypter implements IDecrypter {
  async decrypt(value: string): Promise<string | undefined> {
    return 'any_id';
  }
}
