
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