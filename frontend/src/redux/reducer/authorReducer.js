const stateDefault = {
  authorList: null,
  loadingAuthorList: false,
  errorAuthorList: null,

  loadingCreateAuthor: false,
  successCreateAuthor: null,
  errorCreateAuthor: null,

  loadingDetailAuthor: false,
  successDetailAuthor: null,
  errorDetailAuthor: null,

  loadingUpdateAuthor: false,
  successUpdateAuthor: null,
  errorUpdateAuthor: null,

  loadingDeleteAuthor: false,
  successDeleteAuthor: null,
  errorDeleteAuthor: null,
};

export const AuthorReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_AUTHOR_REQUEST": {
      return { ...state, loadingAuthorList: true, errorAuthorList: null };
    }
    case "GET_AUTHOR_SUCCESS": {
      return {
        ...state,
        authorList: action.payload.data,
        loadingAuthorList: false,
      };
    }
    case "GET_AUTHOR_FAIL": {
      return {
        ...state,
        errorAuthorList: action.payload.error,
        loadingAuthorList: false,
      };
    }

    case "CREATE_AUTHOR_REQUEST": {
      return {
        ...state,
        loadingCreateAuthor: true,
        errorCreateAuthor: null,
      };
    }
    case "CREATE_AUTHOR_SUCCESS": {
      return {
        ...state,
        successCreateAuthor: action.payload.data,
        loadingCreateAuthor: false,
      };
    }
    case "CREATE_AUTHOR_FAIL": {
      return {
        ...state,
        errorCreateAuthor: action.payload.error,
        loadingCreateAuthor: false,
      };
    }

    case "GET_DETAIL_AUTHOR_REQUEST": {
      return { ...state, loadingDetailAuthor: true, errorDetailAuthor: null };
    }
    case "GET_DETAIL_AUTHOR_SUCCESS": {
      return {
        ...state,
        successDetailAuthor: action.payload.data,
        loadingDetailAuthor: false,
      };
    }
    case "GET_DETAIL_AUTHOR_FAIL": {
      return {
        ...state,
        errorDetailAuthor: action.payload.error,
        loadingDetailAuthor: false,
      };
    }

    case "UPDATE_AUTHOR_REQUEST": {
      return { ...state, loadingUpdateAuthor: true, errorUpdateAuthor: null };
    }
    case "UPDATE_AUTHOR_SUCCESS": {
      return {
        ...state,
        successUpdateAuthor: action.payload.data,
        loadingUpdateAuthor: false,
      };
    }
    case "UPDATE_AUTHOR_FAIL": {
      return {
        ...state,
        errorUpdateAuthor: action.payload.error,
        loadingUpdateAuthor: false,
      };
    }
    case "DELETE_AUTHOR_REQUEST": {
      return { ...state, loadingDeleteAuthor: true, errorDeleteAuthor: null };
    }
    case "DELETE_AUTHOR_SUCCESS": {
      return {
        ...state,
        successDeleteAuthor: action.payload.data,
        loadingDeleteAuthor: false,
      };
    }
    case "DELETE_AUTHOR_FAIL": {
      return {
        ...state,
        errorDeleteAuthor: action.payload.error,
        loadingDeleteAuthor: false,
      };
    }

    case "RESET_AUTHOR": {
      return {
        ...state,
        errorAuthorList: null,

        loadingCreateAuthor: false,
        successCreateAuthor: "",
        errorCreateAuthor: null,

        loadingUpdateAuthor: "",
        successUpdateAuthor: null,
        errorUpdateAuthor: null,

   
      };
    }
    default:
      return { ...state };
  }
};
