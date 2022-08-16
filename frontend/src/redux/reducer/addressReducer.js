const stateDefault = {
  addressProvincesList: null,
  loadingProvincesList: false,
  errorProvincesList: null,
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
    default:
      return { ...state };
  }
};
