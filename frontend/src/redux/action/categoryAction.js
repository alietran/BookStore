import cateAPI from "../../api/cateAPI";

export const getCateList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_CATE_REQUEST",
    });
    cateAPI
      .getAllCate()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_CATE_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_CATE_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const createCate = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_CATE_REQUEST",
      });
      const result = await cateAPI.postCreateCategory(data);
      dispatch({
        type: "CREATE_CATE_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "CREATE_CATE_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getDetailCate = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_DETAIL_CATE_REQUEST",
      });
      const result = await cateAPI.getDetailCategory(id);
      console.log("result", result);
      dispatch({
        type: "GET_DETAIL_CATE_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "GET_DETAIL_CATE_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const updateCate = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_CATE_REQUEST",
      });
      const result = await cateAPI.updateCategory(id, data);
      console.log("result", result);
      dispatch({
        type: "UPDATE_CATE_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_CATE_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const resetCateList = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_CATE",
    });
  };
};


export const deleteCate = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DELETE_CATE_REQUEST",
      });
      const result = await cateAPI.deleteCategory(id);
      console.log("result", result);
      dispatch({
        type: "DELETE_CATE_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "DELETE_CATE_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};