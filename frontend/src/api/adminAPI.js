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
  deleteUser: (id) => {
    return axiosClient.delete(`auth/deleteUser/${id}`);
  },
//   updateUser: (id) => {
//     return axiosClient.put(`/v1/admins/updateUser/${id}`);
//   },
  updateUser: (id, data) => {
    const path = `/v1/admins/${id}`;
    return axiosClient.put(path, data);
  },
  changePass: (user) => {
    return axiosClient.post("auth/updatePassword", user);
  },
  getAllRoles: () => {
    return axiosClient.get("/v1/roles");
  },
};

export default adminAPI;
   
