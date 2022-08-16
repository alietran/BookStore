// const { default: axiosClient } = require("./axiosClient");
const { default: axiosClientAddress } = require("./axiosClient");

const addressAPI = {
  getListProvinces: () => {
    return axiosClientAddress.get("/api/p/");
  },
//   createReceipt: (data) => {
//     const path = `/v1/receipts`;
//     return axiosClient.post(path, data);
//   },
//   getDetailReceipt: (id) => {
//     const path = `/v1/receipts/${id}`;
//     return axiosClient.get(path);
//   },
//   deleteReceipt: (id) => {
//     const path = `/v1/receipts/${id}`;
//     return axiosClient.delete(path);
//   },
//   updateReceipt: (id, data) => {
//     const path = `/v1/receipts/${id}`;
//     return axiosClient.patch(path, data);
//   },
};

export default addressAPI;
