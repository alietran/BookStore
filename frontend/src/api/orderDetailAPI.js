const { default: axiosClient } = require("./axiosClient");

const orderDetailAPI = {
  getAllOrderDetail: () => {
    return axiosClient.get("/v1/ordersdetail");
  },
 
};

export default orderDetailAPI;
