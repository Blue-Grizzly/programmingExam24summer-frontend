
import { makeOptions, handleHttpErrors } from "./fetchUtils";

export type User = { username: string; password: string; roles?: string[] };

interface LoginResponse {
  username: string;
  token: string;
  roles: Array<string>;
}

interface LoginRequest {
  username: string;
  password: string;
}

const authProvider = {
  isAuthenticated: false,
  signIn(user_: LoginRequest): Promise<LoginResponse> {
    const options = makeOptions("POST", user_);
    return fetch("http://localhost:8080/api/auth/login", options).then(handleHttpErrors);
  },
};

export type { LoginResponse, LoginRequest };
export { authProvider };
