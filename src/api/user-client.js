import ApiClient from "./api";

const UserClient = {
  get: function (token, id) {
    return ApiClient.get(`/api/users/${id}`, {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
          },
    });
  },
};

export default UserClient;
