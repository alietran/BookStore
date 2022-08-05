const { default: axiosClient } = require("./axiosClient");

const supplierAPI = {
  getAllSupplier: () => {
    return axiosClient.get("v1/suppliers");
  },
  postCreateSupplier: (data) => {
    const path = `/v1/suppliers`;
    return axiosClient.post(path, data);
  },
  getDetailSupplier: (id) => {
    const path = `/v1/suppliers/${id}`;
    return axiosClient.get(path);
  },
  deleteSupplier: (id) => {
    const path = `/v1/suppliers/${id}`;
    return axiosClient.delete(path);
  },
  updateSupplier: (id, data) => {
    const path = `/v1/suppliers/${id}`;
    return axiosClient.patch(path, data);
  },
};

export default supplierAPI;
