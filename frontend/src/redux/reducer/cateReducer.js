const stateDefault = {
  cateList: null,
  loadingCateList: false,
  errorCateList: null,

  loadingCreateCate: false,
  successCreateCate: null,
  errorCreateCate: null,

  loadingDetailCate: false,
  successDetailCate: null,
  errorDetailCate: null,

  loadingUpdateCate: false,
  successUpdateCate: null,
  errorUpdateCate: null,
};

export const CateReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_CATE_REQUEST": {
      return { ...state, loadingCateList: true, errorCateList: null };
    }
    case "GET_CATE_SUCCESS": {
      return {
        ...state,
        cateList: action.payload.data,
        loadingCateList: false,
      };
    }
    case "GET_CATE_FAIL": {
      return {
        ...state,
        errorCateList: action.payload.error,
        loadingCateList: false,
      };
    }

    case "CREATE_CATE_REQUEST": {
      return {
        ...state,
        loadingCreateCate: true,
        errorCreateCate: null,
      };
    }
    case "CREATE_CATE_SUCCESS": {
      return {
        ...state,
        successCreateCate: action.payload.data,
        loadingCreateCate: false,
      };
    }
    case "CREATE_CATE_FAIL": {
      return {
        ...state,
        errorCreateCate: action.payload.error,
        loadingCreateCate: false,
      };
    }

    case "GET_DETAIL_CATE_REQUEST": {
      return { ...state, loadingDetailCate: true, errorDetailCate: null };
    }
    case "GET_DETAIL_CATE_SUCCESS": {
      return {
        ...state,
        successDetailCate: action.payload.data,
        loadingDetailCate: false,
      };
    }
    case "GET_DETAIL_CATE_FAIL": {
      return {
        ...state,
        errorUpdateCate: action.payload.error,
        loadingUpdateCate: false,
      };
    }

    case "UPDATE_CATE_REQUEST": {
      return { ...state, loadingUpdateCate: true, errorUpdateCate: null };
    }
    case "UPDATE_CATE_SUCCESS": {
      return {
        ...state,
        successUpdateCate: action.payload.data,
        loadingUpdateCate: false,
      };
    }
    case "UPDATE_CATE_FAIL": {
      return {
        ...state,
        errorUpdateCate: action.payload.error,
        loadingUpdateCate: false,
      };
    }

    case "RESET_CATE": {
      return {
        ...state,
        errorCateList: null,

        successCreateCate: "",
        loadingCreateCate: false,
        errorCreateCate: null,

        loadingUpdateCate: "",
        successUpdateCate: null,
        errorUpdateCate: null,
      };
    }
    default:
      return { ...state };
  }
};
