export type ValidationErrors = {
  [key: string]: string;
};

function isValidEmail(value: string): boolean {
  // Correct the regex to escape the dot
  return /\S+@\S+\.\S+/.test(value);
}

function isValidPassword(value: string): boolean {
  return value.trim().length >= 7;
}

// Define an interface for the input parameter
export interface CredentialInput {
  email: string;
  password: string;
  username: string;
}

export function validateCredentials(input: CredentialInput): void {
  const validationErrors: ValidationErrors = {};

  if (!isValidEmail(input.email)) {
    validationErrors.email = 'Invalid email address.';
  }

  if (!isValidPassword(input.password)) {
    validationErrors.password =
      'Invalid password. Must be at least 7 characters long.';
  }

  if (Object.keys(validationErrors).length > 0) {
    throw new Error(JSON.stringify(validationErrors));
  }
}
