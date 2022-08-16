const stateDefault = {
  supplierSelected: null,
  selectedBook: null,
  receipForm: null,

  loadingCreateReceipt: false,
  successCreateReceipt: null,
  errorCreateReceipt: null,
};

export const ReceiptReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "SELECT_SUPPLIER": {
      return {
        ...state,
        supplierSelected: action.payload.supplierSelected,
      };
    }
    case "SELECT_BOOK": {
      return { ...state, selectedBook: action.payload.bookSelected };
    }
    case "SUBMIT_RECEIPT": {
      return { ...state, receipForm: action.payload.receipt };
    }
    case "CREATE_RECEIPT_REQUEST": {
      return {
        ...state,
        loadingCreateReceipt: true,
        errorCreateReceipt: null,
      };
    }
    case "CREATE_RECEIPT_SUCCESS": {
      return {
        ...state,
        successCreateReceipt: action.payload.data,
        loadingCreateReceipt: false,
      };
    }
    case "CREATE_RECEIPT_FAIL": {
      return {
        ...state,
        errorCreateReceipt: action.payload.error,
        loadingCreateReceipt: false,
      };
    }
    default:
      return { ...state };
  }
};
