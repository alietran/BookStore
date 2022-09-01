const stateDefault = {
  address: null,
  addressItem: null,

  loadingCreateOrder: false,
  successCreateOrder: null,
  errorCreateOrder: null,

  loadingUpdateOrder: false,
  successUpdateOrder: null,
  errorUpdateOrder: null,

  loadingDetailOrder: false,
  successDetailOrder: null,
  errorDetailOrder: null,
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
      let cart = JSON.parse(localStorage.getItem("cart"));
      // console.log("cart local");
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

    case "RESET_CREATE_ORDER": {
      state.loadingCreateOrder = false;
      state.successCreateOrder = null;
      state.errorCreateOrder = null;
      return state;
    }
    default:
      return { ...state };
  }
};
