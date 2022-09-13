const { default: axiosClient } = require("./axiosClient");

const userAPI = {
  createUser: (user) => {
    return axiosClient.post("/v1/users/createUser", user);
  },
  getUserLoginOtp: (phoneNumber) => {
    const path = "/v1/users/getUserLoginOtp";
    return axiosClient.get(path, phoneNumber);
  },

  updateCurrentHomeUser: (currentUser) => {
    const path = `/v1/users/updateMe`;
    const formData = new FormData();
    for (const key in currentUser) {
      formData.append(key, currentUser[key]);
    }
    return axiosClient.patch(path, formData);
  },

};

export default userAPI;
