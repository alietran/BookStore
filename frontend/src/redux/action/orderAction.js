
import orderAPI from "../../api/orderAPI";

export const getBookList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ORDER_REQUEST",
    });
    orderAPI
      .getAllOrder()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_ORDER_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ORDER_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};


export const createOrder= (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_ORDER_REQUEST",
      });
      const result = await orderAPI.postCreateOrder(data);
      dispatch({
        type: "CREATE_ORDER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: "CREATE_ORDER_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const updateOrder = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_ORDER_REQUEST",
      });
      const result = await orderAPI.updateOrder(id, data);
      console.log("result", result);
      dispatch({
        type: "UPDATE_ORDER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_ORDER_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getDetailOrder = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_DETAIL_ORDER_REQUEST",
      });
      const result = await orderAPI.getDetailOrder(id);
      console.log("result", result);
      dispatch({
        type: "GET_DETAIL_ORDER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "GET_DETAIL_ORDER_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const resetCreateOrder = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_CREATE_ORDER",
    });
  };
};