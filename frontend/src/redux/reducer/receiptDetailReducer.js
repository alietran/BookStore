const stateDefault = {
  receiptDetailList: null,
  loadingReceiptDetailList: false,
  errorReceiptDetailList: null,

  loadingDetailReceipt: false,
  successDetailReceipt: null,
  errorDetailReceipt: null,
};

export const ReceiptDetailReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_ALL_DETAIL_RECEIPT_REQUEST": {
      return {
        ...state,
        loadingReceiptDetailList: true,
        errorReceiptDetailList: null,
      };
    }
    case "GET_ALL_DETAIL_RECEIPT_SUCCESS": {
      return {
        ...state,
        receiptDetailList: action.payload.data,
        loadingReceiptDetailList: false,
      };
    }
    case "GET_ALL_DETAIL_RECEIPT_FAIL": {
      return {
        ...state,
        errorReceiptDetailList: action.payload.error,
        loadingReceiptDetailList: false,
      };
    }
    case "GET_DETAIL_RECEIPT_REQUEST": {
      return { ...state, loadingDetailReceipt: true, errorDetailReceipt: null };
    }
    case "GET_DETAIL_RECEIPT_SUCCESS": {
      return {
        ...state,
        successDetailReceipt: action.payload.data,
        loadingDetailReceipt: false,
      };
    }
    case "GET_DETAIL_RECEIPT_FAIL": {
      return {
        ...state,
        errorDetailReceipt: action.payload.error,
        loadingDetailReceipt: false,
      };
    }

    case "RESET_RECEIPT_DETAIL": {
      return {
        ...state,
        loadingDetailReceipt: false,
        successDetailReceipt: "",
        errorDetailReceipt: null,
      };
    }
    default:
      return { ...state };
  }
};
