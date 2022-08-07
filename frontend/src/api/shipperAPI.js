const { default: axiosClient } = require("./axiosClient");

const shipperAPI = {
  getAllShipper: () => {
    return axiosClient.get("v1/shippers");
  },
  createShipper: (data) => {
    const path = `/v1/shippers`;
    return axiosClient.post(path, data);
  },
  getDetailShipper: (id) => {
    const path = `/v1/shippers/${id}`;
    return axiosClient.get(path);
  },
  deleteShipper: (id) => {
    const path = `/v1/shippers/${id}`;
    return axiosClient.delete(path);
  },
  updateShipper: (id, data) => {
    const path = `/v1/shippers/${id}`;
    return axiosClient.patch(path, data);
  },
};

export default shipperAPI;
