const { default: axiosClient } = require("./axiosClient");

const promotionAPI = {
  getAllPromotion: () => {
    return axiosClient.get("v1/promotions");
  },
  createPromotion: (data) => {
    const path = `/v1/promotions`;
    return axiosClient.post(path, data);
  },
  getDetailPromotion: (id) => {
    const path = `/v1/promotions/${id}`;
    return axiosClient.get(path);
  },
  deletePromotion: (id) => {
    const path = `/v1/promotions/${id}`;
    return axiosClient.delete(path);
  },
  updatePromotion: (id, data) => {
    const path = `/v1/promotions/${id}`;
    return axiosClient.patch(path, data);
  },
};

export default promotionAPI;
