export class InvalidAccessTokenError extends Error {
  constructor() {
    super('The access token is invalid');
    this.name = 'InvalidAccessTokenError';
  }
}
