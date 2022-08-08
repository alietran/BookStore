import authorAPI from "../../api/authorAPI";



export const getAuthorList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_AUTHOR_REQUEST",
    });
    authorAPI
      .getAllAuthor()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_AUTHOR_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_AUTHOR_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const createAuthor = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_AUTHOR_REQUEST",
      });
      const result = await authorAPI.createAuthor(data);
      dispatch({
        type: "CREATE_AUTHOR_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: "CREATE_AUTHOR_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getDetailAuthor = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_DETAIL_AUTHOR_REQUEST",
      });
      const result = await authorAPI.getDetailAuthor(id);
      console.log("result", result);
      dispatch({
        type: "GET_DETAIL_AUTHOR_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "GET_DETAIL_AUTHOR_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const updateAuthor = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_AUTHOR_REQUEST",
      });
      const result = await authorAPI.updateAuthor(id, data);
      console.log("result", result);
      dispatch({
        type: "UPDATE_AUTHOR_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_AUTHOR_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const resetAuthorList = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_AUTHOR",
    });
  };
};

export const deleteAuthor = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DELETE_AUTHOR_REQUEST",
      });
      const result = await authorAPI.deleteAuthor(id);
      console.log("result", result);
      dispatch({
        type: "DELETE_AUTHOR_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "DELETE_AUTHOR_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};
