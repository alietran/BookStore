import adminAPI from "../../api/adminAPI";

export const getUsersList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_USER_LIST_REQUEST",
    });
    adminAPI
      .getAllUser()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_USER_LIST_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_USER_LIST_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const resetUserList = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_USER_LIST",
    });
  };
};
