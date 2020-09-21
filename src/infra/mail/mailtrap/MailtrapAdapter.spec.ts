import { FakeMailTemplateProvider } from '@/providers/mailTemplate/fakes/FakeMailTemplateProvider';
import { MailtrapAdapter } from './MailtrapAdapter';

let fakeMailTemplateAdapter: FakeMailTemplateProvider;
let mailtrapAdapter: MailtrapAdapter;

const makeFakeEmail = () => ({
  to: {
    name: 'any_name',
    email: 'any_email@mail.com',
  },
  subject: '[Calculadora BC] - Esqueci minha senha',
  templateData: {
    file: 'forgot_password',
    variables: {
      name: 'any_name',
      link: `${process.env.APP_WEB_URI}?token=valid_token`,
    },
  },
});

describe('# Mailtrap Adapter', async () => {
  beforeAll(() => {
    fakeMailTemplateAdapter = new FakeMailTemplateProvider();
    mailtrapAdapter = new MailtrapAdapter(fakeMailTemplateAdapter);
  });

  it('should be calls MailtrapAdapter.send with correct value (default from)', async () => {
    const sendSpy = jest.spyOn(mailtrapAdapter, 'send');

    await mailtrapAdapter.send(makeFakeEmail());

    expect(sendSpy).toHaveBeenCalledWith(makeFakeEmail());
  });

  it('should be calls MailtrapAdapter.send with correct value (set from)', async () => {
    const sendSpy = jest.spyOn(mailtrapAdapter, 'send');

    await mailtrapAdapter.send({
      from: {
        name: 'admin',
        email: 'admin@mail.com',
      },
      ...makeFakeEmail(),
    });

    expect(sendSpy).toHaveBeenCalledWith({
      from: {
        name: 'admin',
        email: 'admin@mail.com',
      },
      ...makeFakeEmail(),
    });
  });
});
