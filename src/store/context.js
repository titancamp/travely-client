import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  ownerId: null,
  email: null,
  role: null,
  login: () => {},
});
