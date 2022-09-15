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
        // console.log("result1234", result);
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

//khh dùng
export const updateUser = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_USER_REQUEST",
      });
      const result = await userAPI.updateUser(id, data);
      console.log("result24", result);
      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: "UPDATE_USER_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const updateCurrentHomeUser = (currentUser) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_USER_HOME_CURRENT_REQUEST",
    });
    userAPI
      .updateCurrentHomeUser(currentUser)
      .then((result) => {
        console.log("123456");
        console.log("result", result);
        dispatch({
          type: "UPDATE_USER_HOME_CURRENT_SUCCESS",
          payload: {
            data: result.data.data,
           
          },
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "UPDATE_USER_HOME_CURRENT_FAIL",
          payload: {
            error: error.response?.data.message,
          },
        });
      });
  };
};
