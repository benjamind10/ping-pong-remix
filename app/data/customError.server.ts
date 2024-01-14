export class UserExistsError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, UserExistsError.prototype);
  }
}

export class AuthenticationError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
