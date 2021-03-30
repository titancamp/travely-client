import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  agencyId: null,
  userId: null,
  email: null,
  role: null,
  login: () => {},
});

export const ManageHotelContext = createContext({
  deleteHandler: () => console.log('Row deleted')
});