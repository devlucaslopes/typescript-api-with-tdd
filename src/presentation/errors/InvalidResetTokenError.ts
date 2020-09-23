export class InvalidResetTokenError extends Error {
  constructor() {
    super('The reset password token is invalid');
    this.name = 'InvalidResetTokenError';
  }
}
