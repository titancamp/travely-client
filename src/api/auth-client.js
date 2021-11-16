import ApiClient from "./api";
import appConfig from "../app-config.json";

const authURL = process.env.REACT_APP_AUTH_URL || appConfig.authURL;

const AuthClient = {
  login: function (email, password) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("username", email);
    urlencoded.append("password", password);
    urlencoded.append("grant_type", "password");
    urlencoded.append("client_id", "resourceOwner");
    urlencoded.append("client_secret", "secret");
    urlencoded.append("scope", "offline_access");

    return ApiClient.post("/connect/token", urlencoded, {
      baseURL: authURL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  refresh: function (refreshToken) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("client_id", "resourceOwner");
    urlencoded.append("client_secret", "secret");
    urlencoded.append("refresh_token", refreshToken);

    return ApiClient.post("/connect/token", urlencoded, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  register: function (formData) {
    return ApiClient.post("/api/account/register", formData, {
      baseURL: authURL,
    });
  },
  confirm: function (formData) {
    return ApiClient.get(
      `/api/account/confirm?email=${formData.email}&token=${formData.token}`,
      {
        baseURL: authURL,
      }
    );
  },
  forgetPassword: function (formData) {
    return ApiClient.post("/api/account/password/forget", formData, {
      baseURL: authURL,
    });
  },
  resetPassword: function (formData) {
    return ApiClient.post("/api/account/password/reset", formData, {
      baseURL: authURL,
    });
  },
};

export default AuthClient;
