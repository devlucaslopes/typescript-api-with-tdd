export class AccessDeniedError extends Error {
  constructor() {
    super('The user is not authenticated');
    this.name = 'AccessDeniedError';
  }
}
