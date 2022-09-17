const { default: axiosClient } = require("./axiosClient");

const ratingAPI = {
  getRatingDetail: (id) => {
    return axiosClient.get(`/v1/ratings/book-rating-detail/${id}`);
  },
  createRatingDetail: (data) => {
    const path = `/v1/ratings`;
    return axiosClient.post(path, data);
  },
};


export default ratingAPI;
