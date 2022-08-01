const { default: axiosClient } = require("./axiosClient");

const userAPI = {
  createUser: (user) => {
    return axiosClient.post("/v1/users/createUser", user);
  },
  getUserLoginOtp: (phoneNumber) => {
    const path = "/v1/users/getUserLoginOtp";
    return axiosClient.get(path, phoneNumber);
  },
};

export default userAPI;
