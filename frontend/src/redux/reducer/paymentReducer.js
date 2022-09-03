const stateDefault = {
  paymentList: null,
  loadingPaymentList: false,
  errorPaymentList: null,

  // loadingCreateBook: false,
  // successCreateBook: null,
  // errorCreateBook: null,

  // loadingDetailBook: false,
  // successDetailBook: null,
  // errorDetailBook: null,

  payment: null,

  loadingUpdatePayment: false,
  successUpdatePayment: null,
  errorUpdatePayment: null,

  // loadingDeleteBook: false,
  // successDeleteBook: null,
  // errorDeleteBook: null,
};

export const PaymentReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "ORDER_PAYMENT": {
      const { data  } = action.payload;
    
      return { ...state, payment: data,  };
    }
    case "GET_PAYMENT_REQUEST": {
      return { ...state, loadingPaymentList: true, errorPaymentList: null };
    }
    case "GET_PAYMENT_SUCCESS": {
      return {
        ...state,
        paymentList: action.payload.data,
        loadingPaymentList: false,
      };
    }
    case "GET_PAYMENT_FAIL": {
      return {
        ...state,
        errorPaymentList: action.payload.error,
        loadingPaymentList: false,
      };
    }

    case "UPDATE_PAYMENT_REQUEST": {
      return { ...state, loadingUpdatePayment: true, errorUpdatePayment: null };
    }
    case "UPDATE_PAYMENT_SUCCESS": {
      return {
        ...state,
        successUpdatePayment: action.payload.data,
        loadingUpdatePayment: false,
      };
    }
    case "UPDATE_PAYMENT_FAIL": {
      return {
        ...state,
        errorUpdatePayment: action.payload.error,
        loadingUpdatePayment: false,
      };
    }

    // case "RESET_BOOK": {
    //   return {
    //     ...state,
    //     errorCateList: null,

    //     loadingCreateBook: false,
    //     successCreateBook: "",
    //     errorCreateBook: null,

    //     loadingUpdateBook: false,
    //     successUpdateBook: "",
    //     errorUpdateBook: null,
    //   };
    // }
    default:
      return { ...state };
  }
};
