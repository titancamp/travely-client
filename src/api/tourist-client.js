import ApiClient from "./api";

const TouristClient = {

  getAllTourists: function() {

    return ApiClient.get(`Client`);

  },
  insertTourist: function(data) {

    return ApiClient.post(`Client`, data);

  },
  updateTourist: function(data) {

    return ApiClient.put(`Client/${data["id"]}`, data);

  },
  deleteTourist: function(id) {

    return ApiClient.delete(`Client/${id}`);

  }

};

export default TouristClient;
