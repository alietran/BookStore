const { default: axiosClient } = require("./axiosClient");

const adminAPI = {
    login : (user) => {
        return axiosClient.post("/v1/admins/login", user);
    },
    createUser : (user) => {
        return axiosClient.post("/v1/admins/createUser", user);
    },
    getAllUser : () => {
        return axiosClient.get("/v1/admins");
    },
    deleteUser : (id) => {
        return axiosClient.delete(`auth/deleteUser/${id}`)
    },
    changePass : (user) => {
        return axiosClient.post('auth/updatePassword', user)
    },

}

export default adminAPI;
   
