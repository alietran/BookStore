const stateDefault = {
  subCateList: null,
  loadingSubCateList: false,
  errorSubCateList: null,

  loadingCreateSubCate: false,
  successCreateSubCate: null,
  errorCreateSubCate: null,

  loadingDetailCate: false,
  successDetailCate: null,
  errorDetailCate: null,

  loadingUpdateCate: false,
  successUpdateCate: null,
  errorUpdateCate: null,
};

export const SubCateReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_SUB_CATE_REQUEST": {
      return { ...state, loadingSubCateList: true, errorSubCateList: null };
    }
    case "GET_SUB_CATE_SUCCESS": {
      return {
        ...state,
        subCateList: action.payload.data,
        loadingSubCateList: false,
      };
    }
    case "GET_SUB_CATE_FAIL": {
      return {
        ...state,
        errorSubCateList: action.payload.error,
        loadingSubCateList: false,
      };
    }

    case "CREATE_SUB_CATE_REQUEST": {
      return {
        ...state,
        loadingCreateSubCate: true,
        errorCreateSubCate: null,
      };
    }
    case "CREATE_SUB_CATE_SUCCESS": {
      return {
        ...state,
        successCreateSubCate: action.payload.data,
        loadingCreateSubCate: false,
      };
    }
    case "CREATE_SUB_CATE_FAIL": {
      return {
        ...state,
        errorCreateSubCate: action.payload.error,
        loadingCreateSubCate: false,
      };
    }

  
    case "RESET_SUB_CATE": {
      return {
        ...state,
        errorSubCateList: null,

        successCreateSubCate: "",
        loadingCreateSubCate: false,
        errorCreateSubCate: null,

        loadingUpdateCate: "",
        successUpdateCate: null,
        errorUpdateCate: null,
      };
    }
    default:
      return { ...state };
  }
};
