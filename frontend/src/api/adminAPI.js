const { default: axiosClient } = require("./axiosClient");

const adminAPI = {
    login : (user) => {
        return axiosClient.post("/v1/admin/login", user);
    },
    register : (user) => {
        return axiosClient.post('auth/register', user);
    },
    getAllUser : () => {
        return axiosClient.get("/v1/admin");
    },
    deleteUser : (id) => {
        return axiosClient.delete(`auth/deleteUser/${id}`)
    },
    changePass : (user) => {
        return axiosClient.post('auth/updatePassword', user)
    },

}

export default adminAPI;
   
