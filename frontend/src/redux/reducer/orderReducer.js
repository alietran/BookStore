const stateDefault = {
  address: null,
  addressItem: null,

  orderList: null,
  loadingOrderList: false,
  errorOrderList: null,

  loadingCreateOrder: false,
  successCreateOrder: null,
  errorCreateOrder: null,

  loadingUpdateOrder: false,
  successUpdateOrder: null,
  errorUpdateOrder: null,

  loadingDetailOrder: false,
  successDetailOrder: null,
  errorDetailOrder: null,

  orderRSForWeek: null,
  loadingOrderRSForWeek: false,
  errorOrderRSForWeek: null,

  orderRSForMonth: null,
  loadingOrderRSForMonth: false,
  errorOrderRSForMonth: null,

  orderRSForYear: null,
  loadingOrderRSForYear: false,
  errorOrderRSForYear: null,

  orderByUser: null,
  loadingOrderByUser: false,
  errorOrderByUser: null,

  orderByBookYear: null,
  loadingOrderByBookYear: false,
  errorOrderByBookYear: null,

  orderByBookMonth: null,
  loadingOrderByBookMonth: false,
  errorOrderByBookMonth: null,
};

export const OrderReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "ORDER_ADDRESS": {
      return { ...state, address: action.payload.data };
    }
    case "ADDRESS_DEFAULT": {
      return { ...state, addressItem: action.payload.data };
    }
    case "CREATE_ORDER_REQUEST": {
      return {
        ...state,
        loadingCreateOrder: true,
        errorCreateOrder: null,
      };
    }
    case "CREATE_ORDER_SUCCESS": {
      console.log("124");

      localStorage.setItem("cart", [""]);
      // JSON.parse(localStorage.getItem("products"));
      // let cart = JSON.parse(localStorage.getItem("cart"));
      // console.log("cart local", cart);
      return {
        ...state,
        successCreateOrder: action.payload.data,
        loadingCreateOrder: false,
      };
    }
    case "CREATE_ORDER_FAIL": {
      return {
        ...state,
        errorCreateOrder: action.payload.error,
        loadingCreateOrder: false,
      };
    }

    case "UPDATE_ORDER_REQUEST": {
      return { ...state, loadingUpdateOrder: true, errorUpdateOrder: null };
    }
    case "UPDATE_ORDER_SUCCESS": {
      return {
        ...state,
        successUpdateOrder: action.payload.data,
        loadingUpdateOrder: false,
      };
    }
    case "UPDATE_ORDER_FAIL": {
      return {
        ...state,
        errorUpdateOrder: action.payload.error,
        loadingUpdateOrder: false,
      };
    }

    case "GET_DETAIL_ORDER_REQUEST": {
      return { ...state, loadingDetailOrder: true, errorDetailOrder: null };
    }
    case "GET_DETAIL_ORDER_SUCCESS": {
      return {
        ...state,
        successDetailOrder: action.payload.data,
        loadingDetailOrder: false,
      };
    }
    case "GET_DETAIL_ORDER_FAIL": {
      return {
        ...state,
        errorDetailOrder: action.payload.error,
        loadingDetailOrder: false,
      };
    }

    case "GET_ORDER_REQUEST": {
      return { ...state, loadingOrderList: true, errorOrderList: null };
    }
    case "GET_ORDER_SUCCESS": {
      return {
        ...state,
        orderList: action.payload.data,
        loadingOrderList: false,
      };
    }
    case "GET_ORDER_FAIL": {
      return {
        ...state,
        errorOrderList: action.payload.error,
        loadingOrderList: false,
      };
    }
    case "GET_ORDER_RS_FOR_WEEK_REQUEST": {
      return {
        ...state,
        loadingOrderRSForWeek: true,
        errorOrderRSForWeek: null,
      };
    }
    case "GET_ORDER_RS_FOR_WEEK_SUCCESS": {
      return {
        ...state,
        orderRSForWeek: action.payload.data,
        loadingOrderRSForWeek: false,
      };
    }
    case "GET_ORDER_RS_FOR_WEEK_FAIL": {
      return {
        ...state,
        errorOrderRSForWeek: action.payload.error,
        loadingOrderRSForWeek: false,
      };
    }
    case "GET_ORDER_RS_FOR_MONTH_REQUEST": {
      return {
        ...state,
        loadingOrderRSForMonth: true,
        errorOrderRSForMonth: null,
      };
    }
    case "GET_ORDER_RS_FOR_MONTH_SUCCESS": {
      return {
        ...state,
        orderRSForMonth: action.payload.data,
        loadingOrderRSForMonth: false,
      };
    }
    case "GET_ORDER_RS_FOR_MONTH_FAIL": {
      return {
        ...state,
        errorOrderRSForMonth: action.payload.error,
        loadingOrderRSForMonth: false,
      };
    }
    case "GET_ORDER_RS_FOR_YEAR_REQUEST": {
      return {
        ...state,
        loadingOrderRSForYear: true,
        errorOrderRSForYear: null,
      };
    }
    case "GET_ORDER_RS_FOR_YEAR_SUCCESS": {
      return {
        ...state,
        orderRSForYear: action.payload.data,
        loadingOrderRSForYear: false,
      };
    }
    case "GET_ORDER_RS_FOR_YEAR_FAIL": {
      return {
        ...state,
        errorOrderRSForYear: action.payload.error,
        loadingOrderRSForYear: false,
      };
    }
    case "GET_ORDER_BY_USER_REQUEST": {
      return {
        ...state,
        loadingOrderByUser: true,
        errorOrderByUser: null,
      };
    }
    case "GET_ORDER_BY_USER_SUCCESS": {
      return {
        ...state,
        orderByUser: action.payload.data,
        loadingOrderByUser: false,
      };
    }
    case "GET_ORDER_BY_USER_FAIL": {
      return {
        ...state,
        errorOrderByUser: action.payload.error,
        loadingOrderByUser: false,
      };
    }
    case "GET_ORDER_BY_BOOK_YEAR_REQUEST": {
      return {
        ...state,

        loadingOrderByBookYear: true,
        errorOrderByBookYear: null,
      };
    }
    case "GET_ORDER_BY_BOOK_YEAR_SUCCESS": {
      return {
        ...state,
        orderByBookYear: action.payload.data,
        loadingOrderByBookYear: false,
      };
    }
    case "GET_ORDER_BOOK_YEAR_FAIL": {
      return {
        ...state,
        errorOrderByBookYear: action.payload.error,
        loadingOrderByBookYear: false,
      };
    }
    case "GET_ORDER_BY_BOOK_MONTH_REQUEST": {
      return {
        ...state,

        loadingOrderByBookMonth: true,
        errorOrderByBookMonth: null,
      };
    }
    case "GET_ORDER_BY_BOOK_MONTH_SUCCESS": {
      return {
        ...state,
        orderByBookMonth: action.payload.data,
        loadingOrderByBookMonth: false,
      };
    }
    case "GET_ORDER_BOOK_MONTH_FAIL": {
      return {
        ...state,
        errorOrderByBookMonth: action.payload.error,
        loadingOrderByBookMonth: false,
      };
    }

    case "RESET_ORDER": {
      return {
        ...state,

        loadingOrderList: false,
        errorOrderList: null,

        loadingCreateOrder: false,
        successCreateOrder: "",
        errorCreateOrder: null,

        loadingUpdateOrder: false,
        successUpdateOrder: "",
        errorUpdateOrder: null,
      };
    }

    default:
      return { ...state };
  }
};
