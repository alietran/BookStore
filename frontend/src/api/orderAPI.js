const { default: axiosClient } = require("./axiosClient");

const orderAPI = {
  getAllOrder: () => {
    return axiosClient.get("v1/orders");
  },
  postCreateOrder: (data) => {
    const path = `/v1/orders`;
    return axiosClient.post(path, data);
  },

};

export default orderAPI;
