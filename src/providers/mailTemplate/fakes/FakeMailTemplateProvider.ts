import { IMailTemplateProvider } from '../MailTemplateProvider';

export class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}
