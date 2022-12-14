import orderAPI from "../../api/orderAPI";

export const getOrderList = () => {
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

export const createOrder = (data) => {
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
      console.log("414");
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

export const getOrderRSForWeek = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ORDER_RS_FOR_WEEK_REQUEST",
    });
    orderAPI
      .getOrderRSForWeek()
      .then((result) => {
        dispatch({
          type: "GET_ORDER_RS_FOR_WEEK_SUCCESS",
          payload: {
            data: result.data.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ORDER_RS_FOR_WEEK_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};
export const getOrderRSForMonth = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ORDER_RS_FOR_MONTH_REQUEST",
    });
    orderAPI
      .getOrderRSForMonth()
      .then((result) => {
        console.log("result3534", result);
        dispatch({
          type: "GET_ORDER_RS_FOR_MONTH_SUCCESS",
          payload: {
            data: result.data.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ORDER_RS_FOR_MONTH_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const getOrderRSForYear = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ORDER_RS_FOR_YEAR_REQUEST",
    });
    orderAPI
      .getOrderRSForYear()
      .then((result) => {
        dispatch({
          type: "GET_ORDER_RS_FOR_YEAR_SUCCESS",
          payload: {
            data: result.data.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ORDER_RS_FOR_YEAR_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const resetOrder = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_ORDER",
    });
  };
};

export const getOrderByUser = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ORDER_BY_USER_REQUEST",
    });
    orderAPI
      .getOrderByUser()
      .then((result) => {
        console.log("resultOrder", result);
        dispatch({
          type: "GET_ORDER_BY_USER_SUCCESS",
          payload: {
            data: result.data.data,
          },
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_ORDER_BY_USER_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};
export const getOrderByBookForYear = (id) => {
  console.log("343")
  return (dispatch) => {
    dispatch({
      type: "GET_ORDER_BY_BOOK_YEAR_REQUEST",
    });
    orderAPI
      .getOrderByBookForYear(id)
      .then((result) => {
        console.log("resultOr3443r", result);
        dispatch({
          type: "GET_ORDER_BY_BOOK_YEAR_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_ORDER_BY_BOOK_YEAR_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};
export const getOrderByBookForMonth = (id) => {
  console.log("343")
  return (dispatch) => {
    dispatch({
      type: "GET_ORDER_BY_BOOK_MONTH_REQUEST",
    });
    orderAPI
      .getorderByBookForMonth(id)
      .then((result) => {
        console.log("rte", result);
        dispatch({
          type: "GET_ORDER_BY_BOOK_MONTH_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_ORDER_BY_BOOK_MONTH_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};
