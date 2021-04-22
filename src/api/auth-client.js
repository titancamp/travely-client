import ApiClient from "./api";
import appConfig from "../app-config.json";

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
      baseURL: appConfig.authURL,
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
      baseURL: appConfig.authURL,
    });
  },
  confirm: function (formData) {
    return ApiClient.get(
      `/api/account/confirm?email=${formData.email}&token=${formData.token}`,
      {
        baseURL: appConfig.authURL,
      }
    );
  },
  forgetPassword: function (formData) {
    return ApiClient.post("/api/account/password/forget", formData, {
      baseURL: appConfig.authURL,
    });
  },
  resetPassword: function (formData) {
    return ApiClient.post("/api/account/password/reset", formData, {
      baseURL: appConfig.authURL,
    });
  },
};

export default AuthClient;
