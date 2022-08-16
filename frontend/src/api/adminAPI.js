const { default: axiosClient } = require("./axiosClient");

const adminAPI = {
  login: (user) => {
    return axiosClient.post("/v1/admins/login", user);
  },
  createUser: (user) => {
    return axiosClient.post("/v1/admins/createUser", user);
  },
  getAllUser: () => {
    return axiosClient.get("/v1/admins");
  },
  getAllAccount: () => {
    return axiosClient.get("/v1/admins/getAllAccount");
  },
  deleteUser: (id) => {
    return axiosClient.delete(`/v1/admins/${id}`);
  },
  updateAdmin: (id, data) => {
    const path = `/v1/admins/${id}`;
    return axiosClient.put(path, data);
  },
  updateCurrentUser: (currentUser) => {
    const path = `/v1/admins/updateMe`;
    const formData = new FormData();
    for (const key in currentUser) {
      formData.append(key, currentUser[key]);
    }
    return axiosClient.patch(path, formData);
  },
  changePassword: (currentUser) => {
    const path = `/v1/admins/updateMyPassword`;
    return axiosClient.patch(path, currentUser);
  },
  getAllRoles: () => {
    return axiosClient.get("/v1/roles");
  },
  getDetailUser: (_id) => {
    const path = `/v1/admins/${_id}`;
    return axiosClient.get(path);
  },
};

export default adminAPI;
