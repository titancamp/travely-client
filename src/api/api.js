import { useHistory } from 'react-router-dom';

import axios from "axios";
import AuthClient from "./auth-client";

import appConfig from '../app-config.json';

//const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ApiClient = axios.create({
  baseURL: appConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

ApiClient.interceptors.request.use(async function (config) {
  const authContext = JSON.parse(localStorage.getItem("AuthContext"));
  const dateTime = new Date();

  if (authContext && authContext.accessToken) {
    const expiresIn = new Date(authContext.expiresIn);
    if (expiresIn > dateTime) {
      config.headers['Authorization'] = "Bearer " + authContext.accessToken;
    }
    else if (authContext.refreshToken) {
      authContext.accessToken = null;
      localStorage.setItem("AuthContext", JSON.stringify(authContext));
      await AuthClient.refresh(authContext.refreshToken)
        .then((result) => {
          const expiresIn = new Date(Date.now() + (result.data.expires_in * 1000));
          const data = {
            loggedIn: true,
            accessToken: result.data.access_token,
            refreshToken: result.data.refresh_token,
            expiresIn,
            ownerId: authContext.ownerId,
            email: authContext.email,
            role: authContext.role,
          };
          localStorage.setItem("AuthContext", JSON.stringify(data));
        })
        .catch(() => {
          localStorage.removeItem("AuthContext");
          useHistory().push(`/`);
        });
    }
    else {
      localStorage.removeItem("AuthContext");
    }
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

// global error handling
ApiClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default ApiClient;
