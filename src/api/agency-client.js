import ApiClient from "./api";
import appConfig from '../app-config.json';

const AgencyClient = {
  get: function () {
    return ApiClient.get("/api/agency", {
      baseURL: appConfig.authURL
    });
  },
  update: function (formData){
    return ApiClient.patch("/api/agency", formData, {
      baseURL: appConfig.authURL
    });
  },
};

export default AgencyClient;
