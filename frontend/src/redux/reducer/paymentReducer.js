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

  // loadingUpdateBook: false,
  // successUpdateBook: null,
  // errorUpdateBook: null,

  // loadingDeleteBook: false,
  // successDeleteBook: null,
  // errorDeleteBook: null,
};

export const PaymentReducer = (state = stateDefault, action) => {
  switch (action.type) {
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

    // case "CREATE_BOOK_REQUEST": {
    //   return {
    //     ...state,
    //     loadingCreateBook: true,
    //     errorCreateBook: null,
    //   };
    // }
    // case "CREATE_BOOK_SUCCESS": {
    //   return {
    //     ...state,
    //     successCreateBook: action.payload.data,
    //     loadingCreateBook: false,
    //   };
    // }
    // case "CREATE_BOOK_FAIL": {
    //   return {
    //     ...state,
    //     errorCreateBook: action.payload.error,
    //     loadingCreateBook: false,
    //   };
    // }

    // case "GET_DETAIL_BOOK_REQUEST": {
    //   return { ...state, loadingDetailBook: true, errorDetailBook: null };
    // }
    // case "GET_DETAIL_BOOK_SUCCESS": {
    //   return {
    //     ...state,
    //     successDetailBook: action.payload.data,
    //     loadingDetailBook: false,
    //   };
    // }
    // case "GET_DETAIL_BOOK_FAIL": {
    //   return {
    //     ...state,
    //     errorDetailBook: action.payload.error,
    //     loadingDetailBook: false,
    //   };
    // }

    // case "UPDATE_BOOK_REQUEST": {
    //   return { ...state, loadingUpdateBook: true, errorUpdateBook: null };
    // }
    // case "UPDATE_BOOK_SUCCESS": {
    //   return {
    //     ...state,
    //     successUpdateBook: action.payload.data,
    //     loadingUpdateBook: false,
    //   };
    // }
    // case "UPDATE_BOOK_FAIL": {
    //   return {
    //     ...state,
    //     errorUpdateBook: action.payload.error,
    //     loadingUpdateBook: false,
    //   };
    // }
    // case "DELETE_BOOK_REQUEST": {
    //   return { ...state, loadingDeleteBook: true, errorUpdateBook: null };
    // }
    // case "DELETE_BOOK_SUCCESS": {
    //   return {
    //     ...state,
    //     successDeleteBook: action.payload.data,
    //     loadingDeleteBook: false,
    //   };
    // }
    // case "DELETE_BOOK_FAIL": {
    //   return {
    //     ...state,
    //     errorUpdateBook: action.payload.error,
    //     loadingDeleteBook: false,
    //   };
    // }

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
