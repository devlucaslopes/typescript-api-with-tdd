export interface IForgotPassword {
  execute(email: string): Promise<void>;
}
