export interface IForgotPassword {
  execute(email: string): Promise<string | undefined>;
}
