const { default: axiosClient } = require("./axiosClient");

const orderAPI = {
  getAllOrder: () => {
    return axiosClient.get("v1/orders");
  },
  postCreateOrder: (data) => {
    const path = `/v1/orders`;
    return axiosClient.post(path, data);
  },

  updateOrder: (id, data) => {
    const path = `/v1/orders/${id}`;
    return axiosClient.patch(path, data);
  },

  getDetailOrder: (id) => {
    const path = `/v1/orders/${id}`;
    return axiosClient.get(path);
  },
};

export default orderAPI;
