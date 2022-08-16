import adminAPI from "../../api/adminAPI";

export const getUsersList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_USER_LIST_REQUEST",
    });
    adminAPI
      .getAllUser()
      .then((result) => {
        console.log("result12345", result);
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

export const getAllAccount = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ALL_ACCOUNT_REQUEST",
    });
    adminAPI
      .getAllAccount()
      .then((result) => {
        dispatch({
          type: "GET_ALL_ACCOUNT_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ALL_ACCOUNT_FAIL",
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
export const resetUserListUpdate = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_USER_LIST_UPDATE",
    });
  };
};

export const getRolesList = () => {
  return (dispatch) => {
    adminAPI
      .getAllRoles()
      .then((result) => {
        console.log("res34", result);
        dispatch({
          type: "GET_ROLE_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};

export const updateAdmin = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_ADMIN_REQUEST",
      });
      const result = await adminAPI.updateAdmin(id, data);
      console.log("result", result);
      dispatch({
        type: "UPDATE_ADMIN_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_ADMIN_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};
export const deletelUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DELETE_USER_REQUEST",
      });
      const result = await adminAPI.deleteUser(id);
      console.log("result", result);
      dispatch({
        type: "DELETE_USER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "DELETE_USER_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getDetailUsers = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_DETAIL_USER_REQUEST",
    });
    adminAPI
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
