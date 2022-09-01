const stateDefault = {
  address: null,
  addressItem:null,

  loadingCreateOrder: false,
  successCreateOrder: null,
  errorCreateOrder: null,
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
    default:
      return { ...state };
  }
};
