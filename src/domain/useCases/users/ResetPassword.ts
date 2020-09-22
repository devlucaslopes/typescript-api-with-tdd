export interface IResetPasswordDTO {
  token: string;
  password: string;
}

export interface IResetPassword {
  execute(data: IResetPasswordDTO): Promise<void>;
}
