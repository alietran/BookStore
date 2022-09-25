const { default: axiosClient } = require("./axiosClient");

const ratingAPI = {
  getRatingDetail: (id) => {
    return axiosClient.get(`/v1/ratings/book-rating-detail/${id}`);
  },
  createRatingDetail: (data) => {
    const path = `/v1/ratings`;
    return axiosClient.post(path, data);
  },
  getAllRating: () => {
    return axiosClient.get("v1/ratings");
  },
  updateRating: (id,data) =>{
    return axiosClient.patch(`v1/ratings/${id}`,data);
  }
};

export default ratingAPI;
