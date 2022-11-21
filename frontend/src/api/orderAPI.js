const { default: axiosClient } = require("./axiosClient");

const orderAPI = {
  getAllOrder: () => {
    return axiosClient.get("v1/orders");
  },
  postCreateOrder: (data) => {
    const path = `/v1/orders`;
    return axiosClient.post(path, data);
  },

  updateOrder: (id, data) => {
    const path = `/v1/orders/${id}`;
    return axiosClient.patch(path, data);
  },

  getDetailOrder: (id) => {
    const path = `/v1/orders/${id}`;
    return axiosClient.get(path);
  },

  getOrderRSForWeek: () => {
    return axiosClient.get("v1/orders/orderRevenueStatisticsForWeek");
  },
  getOrderRSForYear: () => {
    return axiosClient.get("v1/orders/orderRevenueStatisticsForYear");
  },
  getOrderRSForMonth: () => {
    return axiosClient.get("v1/orders/orderRevenueStatisticsForMonth");
  },

  getOrderByUser: () => {
    return axiosClient.get("v1/orders/orderList");
  },

  getOrderByBookForYear: (id)=>{
    return axiosClient.post(`v1/orders/orderByBookForYear/${id}`,id);
  },
  
  getorderByBookForMonth : (id) =>{
      return axiosClient.post(`v1/orders/orderByBookForMonth/${id}`,id);
  }
};

export default orderAPI;
