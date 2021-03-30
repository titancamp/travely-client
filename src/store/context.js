import {createContext} from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {
    },
});

export const ManageHotelContext = createContext({
    deleteHandler: () => console.log('Row deleted')
});