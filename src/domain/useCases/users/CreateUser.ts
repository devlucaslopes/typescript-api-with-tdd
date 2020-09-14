import { IUser } from '@/domain/entities/User';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ICreateUser {
  execute: (data: ICreateUserDTO) => Promise<IUser | undefined>;
}
