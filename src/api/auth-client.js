import ApiClient from "./api";

// example API class
const AuthClient = {
  // example method
  login: function () {
    // returns Promise
    return ApiClient.get("/login");
  },
};

export default AuthClient;
