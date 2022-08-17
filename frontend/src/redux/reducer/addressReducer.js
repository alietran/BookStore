const stateDefault = {
  addressProvincesList: null,
  loadingProvincesList: false,
  errorProvincesList: null,

  loadingCreateAddress: false,
  successCreateAddress: null,
  errorCreateAddress: null,

  addressList: null,
  loadingAddressList: false,
  errorAddressList: null,

  loadingDetailAddress: false,
  successDetailAddress: null,
  errorDetailAddress: null,

  loadingUpdateAddress: false,
  successUpdateAddress: null,
  errorUpdateAddress: null,
};

export const AddressReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_ADDRESS_PROVINCES_REQUEST": {
      return { ...state, loadingProvincesList: true, errorProvincesList: null };
    }
    case "GET_ADDRESS_PROVINCES_SUCCESS": {
      return {
        ...state,
        addressProvincesList: action.payload.data,
        loadingProvincesList: false,
      };
    }
    case "GET_ADDRESS_PROVINCES_FAIL": {
      return {
        ...state,
        errorProvincesList: action.payload.error,
        loadingProvincesList: false,
      };
    }

    case "CREATE_ADDRESS_REQUEST": {
      return {
        ...state,
        loadingCreateAddress: true,
        errorCreateAddress: null,
      };
    }
    case "CREATE_ADDRESS_SUCCESS": {
      return {
        ...state,
        successCreateAddress: action.payload.data,
        loadingCreateAddress: false,
      };
    }
    case "CREATE_ADDRESS_FAIL": {
      return {
        ...state,
        errorCreateAddress: action.payload.error,
        loadingCreateAddress: false,
      };
    }
    case "GET_ADDRESS_REQUEST": {
      return { ...state, loadingAddressList: true, errorAddressList: null };
    }
    case "GET_ADDRESS_SUCCESS": {
      return {
        ...state,
        addressList: action.payload.data,
        loadingAddressList: false,
      };
    }
    case "GET_ADDRESS_FAIL": {
      return {
        ...state,
        errorAddressList: action.payload.error,
        loadingAddressList: false,
      };
    }
    case "GET_DETAIL_ADDRESS_REQUEST": {
      return { ...state, loadingDetailAddress: true, errorDetailAddress: null };
    }
    case "GET_DETAIL_ADDRESS_SUCCESS": {
      return {
        ...state,
        successDetailAddress: action.payload.data,
        loadingDetailAddress: false,
      };
    }
    case "GET_DETAIL_ADDRESS_FAIL": {
      return {
        ...state,
        errorDetailAddress: action.payload.error,
        loadingDetailAddress: false,
      };
    }

    case "UPDATE_ADDRESS_REQUEST": {
      return { ...state, loadingUpdateAddress: true, errorUpdateAddress: null };
    }
    case "UPDATE_ADDRESS_SUCCESS": {
      return {
        ...state,
        successUpdateAddress: action.payload.data,
        loadingUpdateAddress: false,
      };
    }
    case "UPDATE_ADDRESS_FAIL": {
      return {
        ...state,
        errorUpdateAddress: action.payload.error,
        loadingUpdateAddress: false,
      };
    }

    default:
      return { ...state };
  }
};
