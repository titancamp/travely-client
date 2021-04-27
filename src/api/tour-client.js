import ApiClient from "./api";

const TourClient = {
  getAllTours: function () {
    return ApiClient.get("/api/v1/tour");
  },
  createTour: function (model) {
    return ApiClient.post("/api/v1/tour", model).then(
      (response) => response.data
    );
  },
};

export default TourClient;
