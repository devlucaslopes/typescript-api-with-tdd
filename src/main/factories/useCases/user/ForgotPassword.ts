import { ForgotPassword } from '@/data/useCases/users/ForgotPassword';
import { MailtrapAdapter } from '@/infra/mail/mailtrap/MailtrapAdapter';
import UserRepository from '@/infra/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '@/infra/typeorm/repositories/UserTokenRepository';

export const makeForgotPassword = (): ForgotPassword => {
  const mailProvider = new MailtrapAdapter();
  const userTokenRepository = new UserTokenRepository();
  const userRepository = new UserRepository();

  return new ForgotPassword(userRepository, userTokenRepository, mailProvider);
};
