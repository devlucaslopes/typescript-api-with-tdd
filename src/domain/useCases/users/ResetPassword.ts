import { IUser } from '@/domain/entities/User';

export interface IResetPasswordDTO {
  token: string;
  password: string;
}

export interface IResetPassword {
  execute(data: IResetPasswordDTO): Promise<IUser | undefined>;
}
