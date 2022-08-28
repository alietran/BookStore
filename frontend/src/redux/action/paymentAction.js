import paymentAPI from "../../api/paymentAPI";

export const getPaymentList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_PAYMENT_REQUEST",
    });
    paymentAPI
      .getAllPayment()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_PAYMENT_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_PAYMENT_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const createPayment = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_PAYMENT_REQUEST",
      });
      const result = await paymentAPI.createPayment(data);
      console.log("CREATE_PAYMENT_SUCCESS", data);
      dispatch({
        type: "CREATE_PAYMENT_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: "CREATE_PAYMENT_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getDetailPayment = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_DETAIL_PAYMENT_REQUEST",
      });
      const result = await paymentAPI.getDetailPayment(id);
      console.log("result", result);
      dispatch({
        type: "GET_DETAIL_PAYMENT_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "GET_DETAIL_PAYMENT_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const updatePayment = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_PAYMENT_REQUEST",
      });
      const result = await paymentAPI.updatePayment(id, data);
      console.log("result", result);
      dispatch({
        type: "UPDATE_PAYMENT_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_PAYMENT_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const deletePayment = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DELETE_PAYMENT_REQUEST",
      });
      const result = await paymentAPI.deletePayment(id);
      console.log("result", result);
      dispatch({
        type: "DELETE_PAYMENT_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "DELETE_PAYMENT_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};
