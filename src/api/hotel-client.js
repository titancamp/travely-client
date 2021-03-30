import ApiClient from "./api";

const HotelClient = {
    getHotels: async function () {
        return await ApiClient.get('/Properties');
    },
    deleteHotel: async function (data) {
        return await ApiClient.delete(`/Properties/${data}`);
    },
    addHotel: async function (data) {
        return await setTimeout(() => {
            return data;
        }, 0);
    },
    editHotel: async function (data) {
        return await setTimeout(() => {
            return data;
        }, 0);
    },
};

export default HotelClient;
