const stateDefault = {
  supplierList: null,
  loadingSupplierList: false,
  errorSupplierList: null,

  loadingUpdateSupplier: false,
  successUpdateSupplier: null,
  errorUpdateSupplier: null,

  loadingCreateSupplier: false,
  successCreateSupplier: null,
  errorCreateSupplier: null,

  loadingDeleteSupplier: false,
  successDeleteSupplier: null,
  errorDeleteSupplier: null,
};

export const SupplierReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "CREATE_SUPPLIER_REQUEST": {
      return {
        ...state,
        loadingCreateSupplier: true,
        errorCreateSupplier: null,
      };
    }
    case "CREATE_SUPPLIER_SUCCESS": {
      return {
        ...state,
        successCreateSupplier: action.payload.data,
        loadingCreateSupplier: false,
      };
    }
    case "CREATE_SUPPLIER_FAIL": {
      return {
        ...state,
        errorCreateSupplier: action.payload.error,
        loadingCreateSupplier: false,
      };
    }

    case "GET_SUPPLIER_REQUEST": {
      return { ...state, loadingSupplierList: true, errorSupplierList: null };
    }
    case "GET_SUPPLIER_SUCCESS": {
      return {
        ...state,
        supplierList: action.payload.data,
        errorSupplierList: false,
      };
    }
    case "GET_SUPPLIER_FAIL": {
      return {
        ...state,
        errorSupplierList: action.payload.error,
        loadingSupplierList: false,
      };
    }
    case "UPDATE_SUPPLIER_REQUEST": {
      return {
        ...state,
        loadingUpdateSupplier: true,
        errorUpdateSupplier: null,
      };
    }
    case "UPDATE_SUPPLIER_SUCCESS": {
      return {
        ...state,
        successUpdateSupplier: action.payload.data,
        loadingUpdateSupplier: false,
      };
    }
    case "UPDATE_SUPPLIER_FAIL": {
      return {
        ...state,
        errorUpdateCate: action.payload.error,
        loadingUpdateCate: false,
      };
    }
    case "DELETE_SUPPLIER_REQUEST": {
      return {
        ...state,
        loadingDeleteSupplier: true,
        errorDeleteSupplier: null,
      };
    }
    case "DELETE_SUPPLIER_SUCCESS": {
      return {
        ...state,
        successDeleteSupplier: action.payload.data,
        loadingDeleteSupplier: false,
      };
    }
    case "DELETE_SUPPLIER_FAIL": {
      return {
        ...state,
        errorDeleteSupplier: action.payload.error,
        loadingDeleteSupplier: false,
      };
    }
    case "RESET_SUPPLIER": {
      return {
        ...state,

        loadingUpdateSupplier: false,
        successUpdateSupplier: "",
        errorUpdateSupplier: null,

        loadingCreateSupplier: false,
        successCreateSupplier: "",
        errorCreateSupplier: null,
      };
    }
    default:
      return { ...state };
  }
};
