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
// export const getBookByPrice = (value) => {
//   return (dispatch) => {
//     dispatch({
//       type: "GET_BOOK_PRICE_REQUEST",
//     });
//     bookAPI
//       .filterByPrice(value)
//       .then((result) => {
//         console.log("result1234324234", result);
//         dispatch({
//           type: "GET_BOOK_PRICE_SUCCESS",
//           payload: {
//             data: result.data,
//           },
//         });
//       })
//       .catch((error) => {
//         dispatch({
//           type: "GET_BOOK_PRICE_FAIL",
//           payload: {
//             error: error,
//           },
//         });
//       });
//   };
// };

export const createBook = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_BOOK_REQUEST",
      });
      const result = await bookAPI.postCreateBook(data);
      console.log("1231");
      console.log("result", result);
      dispatch({
        type: "CREATE_BOOK_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error1211156", error);
      console.log("235");
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

export const search = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SEARCH_BOOK_REQUEST",
      });
      const result = await bookAPI.search(data);
      console.log("result book", result);
      dispatch({
        type: "SEARCH_BOOK_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error book", error);
      dispatch({
        type: "SEARCH_BOOK_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getSellerBook = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_SELLER_BOOK_REQUEST",
    });
    bookAPI
      .getSellerBook()
      .then((result) => {
        dispatch({
          type: "GET_SELLER_BOOK_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_SELLER_BOOK_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};
export const getLatestBook = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_LATEST_BOOK_REQUEST",
    });
    bookAPI
      .getLatestBook()
      .then((result) => {
        dispatch({
          type: "GET_LATEST_BOOK_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_LATEST_BOOK_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};
