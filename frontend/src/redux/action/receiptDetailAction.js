import receiptDetailAPI from "../../api/receiptDetailAPI";

export const getAllDetailReceipt = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ALL_DETAIL_RECEIPT_REQUEST",
    });
    receiptDetailAPI
      .getAllDetailReceipt()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_ALL_DETAIL_RECEIPT_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ALL_DETAIL_RECEIPT_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};


export const getDetailReceipt = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_DETAIL_RECEIPT_REQUEST",
      });
      const result = await receiptDetailAPI.getDetailReceipt(id);
      console.log("result", result);
      dispatch({
        type: "GET_DETAIL_RECEIPT_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "GET_DETAIL_RECEIPT_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};
