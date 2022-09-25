const stateDefault = {
  shipperList: null,
  loadingShipperList: false,
  errorShipperList: null,

  loadingCreateShipper: false,
  successCreateShipper: null,
  errorCreateShipper: null,

  loadingDetailShipper: false,
  successDetailShipper: null,
  errorDetailShipper: null,

  loadingUpdateShipper: false,
  successUpdateShipper: null,
  errorUpdateShipper: null,

  loadingDeleteShipper: false,
  successDeleteShipper: null,
  errorDeleteShipper: null,

  loadingLogin: false,
  loginSuccess: null,
  errorLogin: null,
};

export const ShipperReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_SHIPPER_REQUEST": {
      return { ...state, loadingShipperList: true, errorShipperList: null };
    }
    case "GET_SHIPPER_SUCCESS": {
      return {
        ...state,
        shipperList: action.payload.data,
        loadingShipperList: false,
      };
    }
    case "GET_SHIPPER_FAIL": {
      return {
        ...state,
        errorShipperList: action.payload.error,
        loadingShipperList: false,
      };
    }

    case "CREATE_SHIPPER_REQUEST": {
      return {
        ...state,
        loadingCreateShipper: true,
        errorCreateShipper: null,
      };
    }
    case "CREATE_SHIPPER_SUCCESS": {
      return {
        ...state,
        successCreateShipper: action.payload.data,
        loadingCreateShipper: false,
      };
    }
    case "CREATE_SHIPPER_FAIL": {
      return {
        ...state,
        errorCreateShipper: action.payload.error,
        loadingCreateShipper: false,
      };
    }

    case "GET_DETAIL_SHIPPER_REQUEST": {
      return { ...state, loadingDetailShipper: true, errorDetailShipper: null };
    }
    case "GET_DETAIL_SHIPPER_SUCCESS": {
      return {
        ...state,
        successDetailShipper: action.payload.data,
        loadingDetailShipper: false,
      };
    }
    case "GET_DETAIL_SHIPPER_FAIL": {
      return {
        ...state,
        errorDetailShipper: action.payload.error,
        loadingDetailShipper: false,
      };
    }

    case "UPDATE_SHIPPER_REQUEST": {
      return { ...state, loadingUpdateShipper: true, errorUpdateShipper: null };
    }
    case "UPDATE_SHIPPER_SUCCESS": {
      return {
        ...state,
        successUpdateShipper: action.payload.data,
        loadingUpdateShipper: false,
      };
    }
    case "UPDATE_SHIPPER_FAIL": {
      return {
        ...state,
        errorUpdateShipper: action.payload.error,
        loadingUpdateShipper: false,
      };
    }
    case "DELETE_SHIPPER_REQUEST": {
      return { ...state, loadingDeleteShipper: true, errorDeleteShipper: null };
    }
    case "DELETE_SHIPPER_SUCCESS": {
      return {
        ...state,
        successDeleteShipper: action.payload.data,
        loadingDeleteShipper: false,
      };
    }
    case "DELETE_SHIPPER_FAIL": {
      return {
        ...state,
        errorDeleteShipper: action.payload.error,
        loadingDeleteShipper: false,
      };
    }
    case "SHIPPER_LOGGIN_REQUEST": {
      return { ...state, loadingLogin: true, errorLogin: null };
    }
    case "SHIPPER_LOGGIN_SUCCESS": {
      const { data, token } = action.payload;
      console.log("action.payload", action.payload);
      localStorage.setItem("shipper", JSON.stringify(data));
      localStorage.setItem("shipper_token", token);

      return {
        ...state,
        loginSuccess: data,
        loadingLogin: false,
      };
    }
    case "SHIPPER_LOGGIN_FAIL": {
      return {
        ...state,
        errorLogin: action.payload.error,
        loadingLogin: false,
      };
    }
    case "LOGOUT_SHIPPER": {
      localStorage.removeItem("shipper");
      localStorage.removeItem("shipper_token");
      return {
        ...state
      };
    }
    case "RESET_SHIPPER": {
      return {
        ...state,
        errorShipperList: null,

        loadingCreateShipper: false,
        successCreateShipper: "",
        errorCreateShipper: null,

        loadingUpdateCate: "",
        successUpdateCate: null,
        errorUpdateCate: null,
      };
    }
    default:
      return { ...state };
  }
};
