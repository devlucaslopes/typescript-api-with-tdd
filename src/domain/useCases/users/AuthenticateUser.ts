import { IAuthentication } from '@/domain/entities/Authentication';

export interface IAuthenticationDTO {
  email: string;
  password: string;
}

export interface IAuthenticateUser {
  execute: (data: IAuthenticationDTO) => Promise<IAuthentication | undefined>;
}
