const { default: axiosClient } = require("./axiosClient");

const authorAPI = {
  getAllAuthor: () => {
    return axiosClient.get("v1/authors");
  },
  createAuthor: (data) => {
    const path = `/v1/authors`;
    return axiosClient.post(path, data);
  },
  getDetailAuthor: (id) => {
    const path = `/v1/authors/${id}`;
    return axiosClient.get(path);
  },
  deleteAuthor: (id) => {
    const path = `/v1/authors/${id}`;
    return axiosClient.delete(path);
  },
  updateAuthor: (id, data) => {
    const path = `/v1/authors/${id}`;
    return axiosClient.patch(path, data);
  },
};

export default authorAPI;
