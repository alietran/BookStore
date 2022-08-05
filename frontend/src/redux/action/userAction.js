import userAPI from "../../api/userAPI";


export const createUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: "CREATE_USER1_REQUEST",
    });
    userAPI
      .createUser(user)
      .then((result) => {
        dispatch({
          type: "CREATE_USER1_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((err) => {
        console.log("err", err.response.data.message);
        dispatch({
          type: "CREATE_USER1_FAIL",
          payload: {
            err: err.response.data.message,
          },
        });
      });
  };
};

export const getDetailUsers = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_DETAIL_USER_REQUEST",
    });
    userAPI
      .getDetailUser()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_DETAIL_USER_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_DETAIL_USER_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};
