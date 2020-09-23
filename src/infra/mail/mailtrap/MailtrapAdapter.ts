import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider, ISendMailDTO } from '@/providers/mail/MailProvider';
import { IMailTemplateProvider } from '@/providers/mailTemplate/MailTemplateProvider';

export class MailtrapAdapter implements IMailProvider {
  private client: Transporter;

  constructor(private readonly mailTemplate: IMailTemplateProvider) {
    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'f35a558256022d',
        pass: 'b54738bf4c1dc8',
      },
    });

    this.client = transport;
  }

  async send({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || 'System',
        address: from?.email || 'system@mail.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplate.parse(templateData),
    });
  }
}
