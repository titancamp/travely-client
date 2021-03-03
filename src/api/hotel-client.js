import ApiClient, { FormDataConfig } from "./api";

const HotelClient = {
    addHotel: function (data) {
        return ApiClient.post('/hotel', data, FormDataConfig);
    },
};

export default HotelClient;