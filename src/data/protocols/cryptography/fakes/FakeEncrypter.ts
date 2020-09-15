import { IEncrypter } from '../Encrypter';

export class FakeEncrypter implements IEncrypter {
  async encrypt(value: string): Promise<string> {
    return 'any_token';
  }
}
