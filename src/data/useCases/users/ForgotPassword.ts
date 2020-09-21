import { IUserRepository } from '@/data/protocols/database/users/UserRepository';
import { IUserTokenRepository } from '@/data/protocols/database/users/UserTokenRepository';
import { IForgotPassword } from '@/domain/useCases/users/ForgotPassword';
import { IMailProvider } from '@/providers/mail/MailProvider';

export class ForgotPassword implements IForgotPassword {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userTokenRepository: IUserTokenRepository,
    private readonly mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<string | undefined> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return undefined;
    }

    const { token } = await this.userTokenRepository.create(user.id);

    await this.mailProvider.send({
      to: {
        name: user.name,
        email,
      },
      subject: '[Calculadora BC] - Esqueci minha senha',
      templateData: {
        file: 'forgot_password',
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URI}?token=${token}`,
        },
      },
    });

    return user.name;
  }
}
