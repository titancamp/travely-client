import ApiClient from "./api";

const TourClient = {
  getAllTours: function() {
    return ApiClient.get('/tour');
  },
};

export default TourClient;
