import bookAPI from "../../api/bookAPI";

export const getBookList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_BOOK_REQUEST",
    });
    bookAPI
      .getAllBook()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_BOOK_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_BOOK_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const createBook = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_BOOK_REQUEST",
      });
      const result = await bookAPI.postCreateBook(data);
      dispatch({
        type: "CREATE_BOOK_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error1211156", error);
      dispatch({
        type: "CREATE_BOOK_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getDetailBook = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_DETAIL_BOOK_REQUEST",
      });
      const result = await bookAPI.getDetailBook(id);
      console.log("result", result);
      dispatch({
        type: "GET_DETAIL_BOOK_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "GET_DETAIL_BOOK_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const updateBook = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_BOOK_REQUEST",
      });
      const result = await bookAPI.updateBook(id, data);
      console.log("result", result);
      dispatch({
        type: "UPDATE_BOOK_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error", error.response?.data.message);
      dispatch({
        type: "UPDATE_BOOK_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const resetBookList = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_BOOK",
    });
  };
};

export const deleteBook = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DELETE_BOOK_REQUEST",
      });
      const result = await bookAPI.deleteBook(id);
      console.log("result", result);
      dispatch({
        type: "DELETE_BOOK_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "DELETE_BOOK_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};
