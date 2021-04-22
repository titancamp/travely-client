import ApiClient from "./api";

const TouristClient = {
  getAllTourists: function () {
    return ApiClient.get(`/api/v1/Client`);
  },
  insertTourist: function (data) {
    return ApiClient.post(`/api/v1/Client`, data);
  },
  updateTourist: function (data) {
    return ApiClient.put(`/api/v1/Client/${data["id"]}`, data);
  },
  deleteTourist: function (id) {
    return ApiClient.delete(`/api/v1/Client/${id}`);
  },
};

export default TouristClient;
