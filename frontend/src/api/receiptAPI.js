const { default: axiosClient } = require("./axiosClient");

const receiptAPI = {
  getAllShipper: () => {
    return axiosClient.get("v1/receipt");
  },
  createShipper: (data) => {
    const path = `/v1/receipt`;
    return axiosClient.post(path, data);
  },
  getDetailShipper: (id) => {
    const path = `/v1/receipt/${id}`;
    return axiosClient.get(path);
  },
  deleteShipper: (id) => {
    const path = `/v1/receipt/${id}`;
    return axiosClient.delete(path);
  },
  updateShipper: (id, data) => {
    const path = `/v1/receipt/${id}`;
    return axiosClient.patch(path, data);
  },
};

export default receiptAPI;
