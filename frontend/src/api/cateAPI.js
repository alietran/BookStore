const { default: axiosClient } = require("./axiosClient");

const cateAPI = {
  getAllCate: () => {
    return axiosClient.get("v1/categories");
  },
  postCreateCategory: (data) => {
    const path = `/v1/categories`;
    return axiosClient.post(path, data);
  },
  getDetailCategory: (id) => {
    const path = `/v1/categories/${id}`;
    return axiosClient.get(path);
  },
  deleteCategory: (id) => {
    const path = `/v1/categories/${id}`;
    return axiosClient.delete(path);
  },
  updateCategory: (id, data) => {
    const path = `/v1/categories/${id}`;
    return axiosClient.patch(path, data);
  },
};

export default cateAPI;
