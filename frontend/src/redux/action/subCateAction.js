import subCateAPI from "../../api/subCateAPI";

export const getSubCateList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_SUB_CATE_REQUEST",
    });
    subCateAPI
      .getAllSubCate()
      .then((result) => {
        dispatch({
          type: "GET_SUB_CATE_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_SUB_CATE_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const createSubCate = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_SUB_CATE_REQUEST",
      });
      const result = await subCateAPI.postCreateSubCategory(data);
      dispatch({
        type: "CREATE_SUB_CATE_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "CREATE_SUB_CATE_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};


export const resetSubCateList = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_SUB_CATE",
    });
  };
};
