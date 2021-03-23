import ApiClient from "./api";

// example API object
const AuthClient = {
  // example method
  login: function () {
    // returns Promise
    return ApiClient.get("/login");
  },
  updateAgencyProfile: function (jwtToken, formData){
    return ApiClient.patch("http://localhost:5000/api/agency", formData, {
    headers: {  
        Authorization: "Bearer " + jwtToken,
      "Content-Type": "application/json",
    }
    });
  },
  getAgencyProfile: function (jwtToken){
    return ApiClient.get("http://localhost:5000/api/agency", {
    headers: {  
        Authorization: "Bearer " + jwtToken,
      "Content-Type": "application/json",
    }
    });
  },
};

export default AuthClient;
