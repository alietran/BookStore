const { default: axiosClient } = require("./axiosClient");

const receiptDetailAPI = {
  getAllDetailReceipt: () => {
    return axiosClient.get("v1/receiptsdetail");
  },
  getDetailReceipt: (id) => {
    const path = `/v1/receiptsdetail/${id}`;
    return axiosClient.get(path);
  },
};

export default receiptDetailAPI;
