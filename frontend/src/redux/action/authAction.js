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
export const createAdmin = (user) => {
  return async (dispatch) => {
    console.log("123");

    dispatch({
      type: "CREATE_ADMIN_REQUEST",
    });
    adminAPI
      .createUser(user)
      .then((result) => {
        console.log("result", result);
        console.log("user", user);
        dispatch({
          type: "CREATE_ADMIN_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((err) => {
        console.log("err", err.response.data.message);
        dispatch({
          type: "CREATE_ADMIN_FAIL",
          payload: {
            err: err.response.data.message,
          },
        });
      });
  };
};


export const updateCurrentUser = (currentUser) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_USER_CURRENT_REQUEST",
    });
    adminAPI
      .updateCurrentUser(currentUser)
      .then((result) => {
        dispatch({
          type: "UPDATE_USER_CURRENT_SUCCESS",
          payload: {
            status: result.data.status,
            data: result.data,
            token: result.data.token,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "UPDATE_USER_CURRENT_FAIL",
          payload: {
            error: error.response?.data.message,
          },
        });
      });
  };
};

export const changePassword = (currentUser) => {
  return (dispatch) => {
    dispatch({
      type: "CHANGE_PASSWORD_REQUEST",
    });
    adminAPI
      .changePassword(currentUser)
      .then((result) => {
        dispatch({
          type: "CHANGE_PASSWORD_SUCCESS",
          payload: {
            status: result.data.status,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "CHANGE_PASSWORD_FAIL",
          payload: {
            error: error?.response.data.message,
          },
        });
      });
  };
};
