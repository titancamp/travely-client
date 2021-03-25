import ApiClient from "./api";

const AgencyClient = {
  get: function (token) {
    return ApiClient.get("/api/agency", {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
          },
    });
  },
};

export default AgencyClient;
