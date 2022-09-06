
import receiptAPI from "../../api/receiptAPI";

export const getAllReceipt = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ALL_RECEIPT_REQUEST",
    });
    receiptAPI
      .getAllReceipt()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_ALL_RECEIPT_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ALL_RECEIPT_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const createReceipt = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_RECEIPT_REQUEST",
      });
      const result = await receiptAPI.createReceipt(data);
      dispatch({
        type: "CREATE_RECEIPT_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error1211156", error);
      dispatch({
        type: "CREATE_RECEIPT_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const updateReceipt = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_RECEIPT_REQUEST",
      });
      const result = await receiptAPI.updateReceipt(id, data);
      console.log("result", result);
      dispatch({
        type: "UPDATE_RECEIPT_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error",error.response?.data.message)
      dispatch({
        type: "UPDATE_RECEIPT_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};


export const getReceiptRSForWeek = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_RECEIPT_RS_FOR_WEEK_REQUEST",
    });
    receiptAPI
      .getReceiptRSForWeek()
      .then((result) => {
        dispatch({
          type: "GET_RECEIPT_RS_FOR_WEEK_SUCCESS",
          payload: {
            data: result.data.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_RECEIPT_RS_FOR_WEEK_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const resetReceiptList = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_RECEIPT",
    });
  };
};

