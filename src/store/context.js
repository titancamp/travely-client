import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  jwt: null,
  email: null,
  role: null,
  login: () => {},
});
