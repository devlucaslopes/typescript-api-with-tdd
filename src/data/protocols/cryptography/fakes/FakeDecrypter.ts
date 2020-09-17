import { IDecrypter } from '../Decrypter';

export class FakeDecrypter implements IDecrypter {
  async decrypt(value: string): Promise<string> {
    return 'any_id';
  }
}
