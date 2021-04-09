import ApiClient from "./api";

const UserClient = {
  get: function (id) {
    return ApiClient.get(`/api/users/${id}`);
  },
};

export default UserClient;
