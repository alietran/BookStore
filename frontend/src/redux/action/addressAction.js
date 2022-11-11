import addressAPI from "../../api/addressAPI";

export const getListProvinces = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ADDRESS_PROVINCES_REQUEST",
    });
    addressAPI
      .getListProvinces()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_ADDRESS_PROVINCES_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ADDRESS_PROVINCES_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const getAddressList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ADDRESS_REQUEST",
    });
    addressAPI
      .getAllAddress()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_ADDRESS_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ADDRESS_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const createAddress = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_ADDRESS_REQUEST",
      });
      const result = await addressAPI.createAddress(data);
      // console.log(first)
      dispatch({
        type: "CREATE_ADDRESS_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error1211156", error);
      dispatch({
        type: "CREATE_ADDRESS_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getDetailAddress = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_DETAIL_ADDRESS_REQUEST",
      });
      const result = await addressAPI.getDetailAddress(id);
      console.log("result", result);
      dispatch({
        type: "GET_DETAIL_ADDRESS_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "GET_DETAIL_ADDRESS_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const updateAddress = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_ADDRESS_REQUEST",
      });
      const result = await addressAPI.updateAddress(id, data);
      console.log("result", result);
      dispatch({
        type: "UPDATE_ADDRESS_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: "UPDATE_ADDRESS_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};


export const deleteAddress = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DELETE_ADDRESS_REQUEST",
      });
      const result = await addressAPI.deleteBook(id);
      console.log("result", result);
      dispatch({
        type: "DELETE_ADDRESS_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "DELETE_ADDRESS_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};
