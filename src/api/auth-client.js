import ApiClient from "./api";

const AuthClient = {
  login: function (email, password) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("username", email);
    urlencoded.append("password", password);
    urlencoded.append("grant_type", "password");
    urlencoded.append("client_id", "resourceOwner");
    urlencoded.append("client_secret", "secret");
    urlencoded.append("scope", "offline_access");

    return ApiClient.post("/connect/token",
    urlencoded,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  register: function (formData) {
    return ApiClient.post("/api/account/register", formData);
  },
  confirm: function (formData) {
    return ApiClient.get(`/api/account/confirm?email=${formData.email}&token=${formData.token}`);
  },
  forgetPassword: function (formData) {
    return ApiClient.post("/api/account/password/forget", formData);
  },
  resetPassword: function (formData) {
    return ApiClient.post("/api/account/password/reset", formData);
  },
};

export default AuthClient;
