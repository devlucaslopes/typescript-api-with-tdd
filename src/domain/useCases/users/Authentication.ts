export interface IAuthenticationDTO {
  email: string;
  password: string;
}

export interface IAuthentication {
  execute: (data: IAuthenticationDTO) => Promise<string | undefined>;
}
