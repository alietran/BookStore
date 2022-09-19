const { default: axiosClient } = require("./axiosClient");

const bookAPI = {
  getAllBook: () => {
    return axiosClient.get("v1/books");
  },
  postCreateBook: (data) => {
    const path = `/v1/books`;
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
      if (key === "gallery") {
        for (let i = 0; i < data[key].length; i++) {
          formData.append(key, data[key][i]);
        }
      }
    }
    return axiosClient.post(path, formData);
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
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
      if (key === "gallery") {
        for (let i = 0; i < data[key].length; i++) {
          formData.append(key, data[key][i]);
        }
      }
    }
    return axiosClient.patch(path, formData);
  },
  search: (data) => {
    const path = `/v1/books/search-book/?search=${data}`;
    return axiosClient.get(path, data);
  },
};

export default bookAPI;
