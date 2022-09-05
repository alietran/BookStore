const stateDefault = {
  orderDetailList: null,
  loadingOrderDetailList: false,
  errorOrderDetailList: null,

  // loadingDetailReceipt: false,
  // successDetailReceipt: null,
  // errorDetailReceipt: null,
};

export const OrderDetailReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_ALL_DETAIL_ORDER_REQUEST": {
      return {
        ...state,
        loadingOrderDetailList: true,
        errorOrderDetailList: null,
      };
    }
    case "GET_ALL_DETAIL_ORDER_SUCCESS": {
      return {
        ...state,
        orderDetailList: action.payload.data,
        loadingOrderDetailList: false,
      };
    }
    case "GET_ALL_DETAIL_ORDER_FAIL": {
      return {
        ...state,
        errorOrderDetailList: action.payload.error,
        loadingOrderDetailList: false,
      };
    }
    // case "GET_DETAIL_RECEIPT_REQUEST": {
    //   return { ...state, loadingDetailReceipt: true, errorDetailReceipt: null };
    // }
    // case "GET_DETAIL_RECEIPT_SUCCESS": {
    //   return {
    //     ...state,
    //     successDetailReceipt: action.payload.data,
    //     loadingDetailReceipt: false,
    //   };
    // }
    // case "GET_DETAIL_RECEIPT_FAIL": {
    //   return {
    //     ...state,
    //     errorDetailReceipt: action.payload.error,
    //     loadingDetailReceipt: false,
    //   };
    // }

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
