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

    constructor(message: string) {
        super(message);
        this.status = 401; // Unauthorized
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}
