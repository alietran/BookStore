const stateDefault = {
  receiptList: null,
  loadingReceiptList: false,
  errorReceiptList: null,

  supplierSelected: null,
  selectedBook: null,
  receiptForm: null,

  loadingCreateReceipt: false,
  successCreateReceipt: null,
  errorCreateReceipt: null,

  loadingUpdateReceipt: false,
  successUpdateReceipt: null,
  errorUpdateReceipt: null,

  loadingDeleteReceipt: false,
  successDeleteReceipt: null,
  errorDeleteReceipt: null,

  receiptRSForWeek: null,
  loadingReceiptRSForWeek: false,
  errorReceiptRSForWeek: null,

  receiptRSForMonth: null,
  loadingReceiptRSForMonth: false,
  errorReceiptRSForMonth: null,

  receiptRSForYear: null,
  loadingReceiptRSForYear: false,
  errorReceiptRSForYear: null,
};

export const ReceiptReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_ALL_RECEIPT_REQUEST": {
      return {
        ...state,
        loadingReceiptList: true,
        errorReceiptList: null,
      };
    }
    case "GET_ALL_RECEIPT_SUCCESS": {
      return {
        ...state,
        receiptList: action.payload.data,
        loadingReceiptList: false,
      };
    }
    case "GET_ALL_RECEIPT_FAIL": {
      return {
        ...state,
        errorReceiptList: action.payload.error,
        loadingReceiptList: false,
      };
    }
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
      return { ...state, receiptForm: action.payload.receipt };
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

    case "UPDATE_RECEIPT_REQUEST": {
      return { ...state, loadingUpdateReceipt: true, errorUpdateReceipt: null };
    }
    case "UPDATE_RECEIPT_SUCCESS": {
      return {
        ...state,
        successUpdateReceipt: action.payload.data,
        loadingUpdateReceipt: false,
      };
    }
    case "UPDATE_RECEIPT_FAIL": {
      return {
        ...state,
        errorUpdateReceipt: action.payload.error,
        loadingUpdateReceipt: false,
      };
    }
    case "DELETE_RECEIPT_REQUEST": {
      return { ...state, loadingDeleteReceipt: true, errorDeleteReceipt: null };
    }
    case "DELETE_RECEIPT_SUCCESS": {
      return {
        ...state,
        successDeleteReceipt: action.payload.data,
        loadingDeleteReceipt: false,
      };
    }
    case "DELETE_RECEIPT_FAIL": {
      return {
        ...state,
        errorDeleteReceipt: action.payload.error,
        loadingDeleteReceipt: false,
      };
    }
    case "GET_RECEIPT_RS_FOR_WEEK_REQUEST": {
      return {
        ...state,
        loadingReceiptRSForWeek: true,
        errorReceiptRSForWeek: null,
      };
    }
    case "GET_RECEIPT_RS_FOR_WEEK_SUCCESS": {
      return {
        ...state,
        receiptRSForWeek: action.payload.data,
        loadingReceiptRSForWeek: false,
      };
    }
    case "GET_RECEIPT_RS_FOR_WEEK_FAIL": {
      return {
        ...state,
        errorReceiptRSForWeek: action.payload.error,
        loadingReceiptRSForWeek: false,
      };
    }
    case "GET_RECEIPT_RS_FOR_YEAR_REQUEST": {
      return {
        ...state,
        loadingReceiptRSForYear: true,
        errorReceiptRSForYear: null,
      };
    }
    case "GET_RECEIPT_RS_FOR_YEAR_SUCCESS": {
      return {
        ...state,
        receiptRSForYear: action.payload.data,
        loadingReceiptRSForYear: false,
      };
    }
    case "GET_RECEIPT_RS_FOR_YEAR_FAIL": {
      return {
        ...state,
        errorReceiptRSForYear: action.payload.error,
        loadingReceiptRSForYear: false,
      };
    }
    case "GET_RECEIPT_RS_FOR_MONTH_REQUEST": {
      return {
        ...state,
        loadingReceiptRSForMonth: true,
        errorReceiptRSForMonth: null,
      };
    }
    case "GET_RECEIPT_RS_FOR_MONTH_SUCCESS": {
      return {
        ...state,
        receiptRSForMonth: action.payload.data,
        loadingReceiptRSForMonth: false,
      };
    }
    case "GET_RECEIPT_RS_FOR_MONTH_FAIL": {
      return {
        ...state,
        errorReceiptRSForMonth: action.payload.error,
        loadingReceiptRSForMonth: false,
      };
    }
    case "RESET_RECEIPT": {
      return {
        ...state,
        errorReceiptList: null,

        loadingCreateReceipt: "",
        successCreateReceipt: "",
        errorCreateReceipt: null,

        loadingUpdateReceipt: false,
        successUpdateReceipt: "",
        errorUpdateReceipt: null,

        loadingDeleteReceipt: false,
        successDeleteReceipt: "",
        errorDeleteReceipt: null,
      };
    }
    default:
      return { ...state };
  }
};
