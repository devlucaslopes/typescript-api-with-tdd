import { IMailProvider, ISendMailDTO } from '../MailProvider';

export class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async send(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
