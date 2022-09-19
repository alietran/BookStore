const stateDefault = {
  bookList: null,
  loadingBookList: false,
  errorBookList: null,

  loadingCreateBook: false,
  successCreateBook: null,
  errorCreateBook: null,

  loadingDetailBook: false,
  successDetailBook: null,
  errorDetailBook: null,

  loadingUpdateBook: false,
  successUpdateBook: null,
  errorUpdateBook: null,

  loadingDeleteBook: false,
  successDeleteBook: null,
  errorDeleteBook: null,


  loadingBookSearch: false,
  bookSearch: null,
  errorBookSearch: null,
};

export const BookReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_BOOK_REQUEST": {
      return { ...state, loadingBookList: true, errorBookList: null };
    }
    case "GET_BOOK_SUCCESS": {
      return {
        ...state,
        bookList: action.payload.data,
        loadingBookList: false,
      };
    }
    case "GET_BOOK_FAIL": {
      return {
        ...state,
        errorBookList: action.payload.error,
        loadingBookList: false,
      };
    }

    case "CREATE_BOOK_REQUEST": {
      return {
        ...state,
        loadingCreateBook: true,
        errorCreateBook: null,
      };
    }
    case "CREATE_BOOK_SUCCESS": {
      return {
        ...state,
        successCreateBook: action.payload.data,
        loadingCreateBook: false,
      };
    }
    case "CREATE_BOOK_FAIL": {
      return {
        ...state,
        errorCreateBook: action.payload.error,
        loadingCreateBook: false,
      };
    }

    case "GET_DETAIL_BOOK_REQUEST": {
      return { ...state, loadingDetailBook: true, errorDetailBook: null };
    }
    case "GET_DETAIL_BOOK_SUCCESS": {
      return {
        ...state,
        successDetailBook: action.payload.data,
        loadingDetailBook: false,
      };
    }
    case "GET_DETAIL_BOOK_FAIL": {
      return {
        ...state,
        errorDetailBook: action.payload.error,
        loadingDetailBook: false,
      };
    }

    case "UPDATE_BOOK_REQUEST": {
      return { ...state, loadingUpdateBook: true, errorUpdateBook: null };
    }
    case "UPDATE_BOOK_SUCCESS": {
      return {
        ...state,
        successUpdateBook: action.payload.data,
        loadingUpdateBook: false,
      };
    }
    case "UPDATE_BOOK_FAIL": {
      return {
        ...state,
        errorUpdateBook: action.payload.error,
        loadingUpdateBook: false,
      };
    }
    case "DELETE_BOOK_REQUEST": {
      return { ...state, loadingDeleteBook: true, errorUpdateBook: null };
    }
    case "DELETE_BOOK_SUCCESS": {
      return {
        ...state,
        successDeleteBook: action.payload.data,
        loadingDeleteBook: false,
      };
    }
    case "DELETE_BOOK_FAIL": {
      return {
        ...state,
        errorUpdateBook: action.payload.error,
        loadingDeleteBook: false,
      };
    }
    case "SEARCH_BOOK_REQUEST": {
      return { ...state, loadingBookSearch: true, errorBookSearch: null };
    }
    case "SEARCH_BOOK_SUCCESS": {
      return {
        ...state,
        bookSearch: action.payload.data,
        loadingBookSearch: false,
      };
    }
    case "SEARCH_BOOK_FAIL": {
      return {
        ...state,
        errorBookSearch: action.payload.error,
        loadingBookSearch: false,
      };
    }

    case "RESET_BOOK": {
      return {
        ...state,
        errorCateList: null,

        loadingCreateBook: false,
        successCreateBook: "",
        errorCreateBook: null,

        loadingUpdateBook: false,
        successUpdateBook: "",
        errorUpdateBook: null,
      };
    }
    default:
      return { ...state };
  }
};
