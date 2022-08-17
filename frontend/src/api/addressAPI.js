const { default: axiosClient } = require("./axiosClient");
// const { default: axiosClientAddress } = require("./axiosClient");

const addressAPI = {
  createAddress: (data) => {
    const path = `/v1/address`;
    return axiosClient.post(path, data);
  },
  getAllAddress: () => {
    return axiosClient.get("/v1/address/getMeAddress");
  },
  getDetailAddress: (id) => {
    return axiosClient.get(`/v1/address/${id}`);
  },
  //   getDetailReceipt: (id) => {
  //     const path = `/v1/receipts/${id}`;
  //     return axiosClient.get(path);
  //   },
  //   deleteReceipt: (id) => {
  //     const path = `/v1/receipts/${id}`;
  //     return axiosClient.delete(path);
  //   },
  updateAddress: (id, data) => {
    const path = `/v1/address/${id}`;
    return axiosClient.patch(path, data);
  },
};

export default addressAPI;
