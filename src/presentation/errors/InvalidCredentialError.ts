export class InvalidCredentialError extends Error {
  constructor() {
    super('The email/password are invalid');
    this.name = 'InvalidCredentialError';
  }
}
