import ApiClient from "./api";

const AgencyClient = {
  get: function () {
    return ApiClient.get("/api/agency");
  },
  update: function (formData){
    return ApiClient.patch("/api/agency", formData);
  },
};

export default AgencyClient;
