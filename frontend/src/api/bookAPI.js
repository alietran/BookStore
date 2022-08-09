const { default: axiosClient } = require("./axiosClient");

const cateAPI = {
  getAllBook: () => {
    return axiosClient.get("v1/books");
  },
  postCreateBook: (data) => {
    const path = `/v1/books`;
    return axiosClient.post(path, data);
  },
  getDetailBook: (id) => {
    const path = `/v1/books/${id}`;
    return axiosClient.get(path);
  },
  deleteBook: (id) => {
    const path = `/v1/books/${id}`;
    return axiosClient.delete(path);
  },
  updateBook: (id, data) => {
    const path = `/v1/books/${id}`;
    return axiosClient.patch(path, data);
  },
};

export default cateAPI;
