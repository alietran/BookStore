const { default: axiosClient } = require("./axiosClient");

const receiptAPI = {
  getAllReceipt: () => {
    return axiosClient.get("v1/receipts");
  },
  createReceipt: (data) => {
    const path = `/v1/receipts`;
    return axiosClient.post(path, data);
  },
  getDetailReceipt: (id) => {
    const path = `/v1/receipts/${id}`;
    return axiosClient.get(path);
  },
  deleteReceipt: (id) => {
    const path = `/v1/receipts/${id}`;
    return axiosClient.delete(path);
  },
  updateReceipt: (id, data) => {
    const path = `/v1/receipts/${id}`;
    return axiosClient.patch(path, data);
  },
  getReceiptRSForWeek: () => {
    return axiosClient.get("v1/receipts/receiptRevenueStatisticsForWeek");
  },
};

export default receiptAPI;
