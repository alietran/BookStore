const { default: axiosClient } = require("./axiosClient");

const paymentAPI = {
  getAllPayment: () => {
    return axiosClient.get("v1/payments");
  },
  // postCreatePayment: (data) => {
  //   const path = `/v1/payments`;
  //   return axiosClient.post(path, data);
  // },
  // getDetailPayment: (id) => {
  //   const path = `/v1/payments/${id}`;
  //   return axiosClient.get(path);
  // },
  // deletePayment: (id) => {
  //   const path = `/v1/payments/${id}`;
  //   return axiosClient.delete(path);
  // },
  updatePayment: (id, data) => {
    const path = `/v1/payments/${id}`;
    return axiosClient.patch(path, data);
  },

  createMoMoPayment: (data) => {
    const url = "/v1/payments/create";
    return axiosClient.post(url, data);
  },

  queryMoMoPayment: (data) => {
    const url = "/v1/payments/query";
    return axiosClient.post(url, data);
  },

  refundMoMoPayment: (data) => {
    const url = "/v1/payments/refund";
    return axiosClient.post(url, data);
  },
};

export default paymentAPI;
