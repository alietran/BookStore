// import adminAPI from "api/adminAPI";

import adminAPI from "../../api/adminAPI";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: "LOGGIN_REQUEST",
    });
    adminAPI
      .login(user)
      .then((result) => {
        dispatch({
          type: "LOGGIN_SUCCESS",
          payload: {
            data: result.data,
            token: result.data.token,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "LOGGIN_FAIL",
          payload: {
            err: err.response.data.message,
          },
        });
      });
  };
};
export const createUser = (user) => {
  return async (dispatch) => {
    console.log("123");

    dispatch({
      type: "CREATE_USER_REQUEST",
    });
    adminAPI
      .createUser(user)
      .then((result) => {
        console.log("result", result);
        console.log("user", user);
        dispatch({
          type: "CREATE_USER_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((err) => {
        console.log("err", err.response.data.message);
        dispatch({
          type: "CREATE_USER_FAIL",
          payload: {
            err: err.response.data.message,
          },
        });
      });
  };
};

export const getAuthUser = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_AUTH_USER_REQUEST",
    });
    adminAPI
      .getAuthUser()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_AUTH_USER_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_AUTH_USER_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};
