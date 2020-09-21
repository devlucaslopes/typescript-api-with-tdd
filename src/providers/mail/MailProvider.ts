import { IParseMailTemplateDTO } from '../mailTemplate/MailTemplateProvider';

interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

export interface IMailProvider {
  send: (data: ISendMailDTO) => Promise<void>;
}
