export interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
  isAdmin: boolean;
}

export interface ErrorResponse {
  message: string;
  error: string;
  code: null;
}
