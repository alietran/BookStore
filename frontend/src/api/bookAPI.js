const { default: axiosClient } = require("./axiosClient");

const bookAPI = {
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
  search: (data) => {
    const path = `/v1/books/search-book/?search=${data}`;
    return axiosClient.get(path, data);
  },
  getSellerBook: ()=>{
     return axiosClient.get("/v1/books/bestSeller-book");
  },
  getLatestBook:()=>{
    return axiosClient.get("/v1/books/latest-book")
  }
};

export default bookAPI;
