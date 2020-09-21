import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';

import {
  IMailTemplateProvider,
  IParseMailTemplateDTO,
} from '@/providers/mailTemplate/MailTemplateProvider';

export class HandlebarsAdapter implements IMailTemplateProvider {
  async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
    const filePath = path.resolve(__dirname, 'views', `${file}.hbs`);

    const templateFileContent = await fs.promises.readFile(filePath, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
