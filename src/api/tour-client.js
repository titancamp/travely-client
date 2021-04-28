import ApiClient from "./api";

const TourClient = {
  getAllTours: function () {
    return ApiClient.get("/api/v1/tour");
  },
  getTourById: function (id) {
    return ApiClient.get(`/api/v1/tour/${id}`);
  },
  getUpcomingTours: function (startDate) {
    return ApiClient.get(`/api/v1/tour?startDate=${startDate}`);
  },
  getActiveTours: function (endDate) {
    return ApiClient.get(`/api/v1/tour?endDate=${endDate}`);
  },
  createTour: function (model) {
    return ApiClient.post("/api/v1/tour", model).then(
      (response) => response.data
    );
  },
};

export default TourClient;
