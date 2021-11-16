import ApiClient from "./api";
import appConfig from "../app-config.json";

const authURL = process.env.REACT_APP_AUTH_URL || appConfig.authURL;

const AgencyClient = {
  get: function () {
    return ApiClient.get("/api/agency", {
      baseURL: authURL,
    });
  },
  update: function (formData) {
    return ApiClient.put("/api/agency", formData, {
      baseURL: authURL,
    });
  },
};

export default AgencyClient;
