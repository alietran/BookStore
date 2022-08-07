import shipperAPI from "../../api/shipperAPI";

export const getShipperList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_SHIPPER_REQUEST",
    });
    shipperAPI
      .getAllShipper()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_SHIPPER_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_SHIPPER_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const createShipper = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_SHIPPER_REQUEST",
      });
      const result = await shipperAPI.createShipper(data);
      dispatch({
        type: "CREATE_SHIPPER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: "CREATE_SHIPPER_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getDetailShipper = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_DETAIL_SHIPPER_REQUEST",
      });
      const result = await shipperAPI.getDetailShipper(id);
      console.log("result", result);
      dispatch({
        type: "GET_DETAIL_SHIPPER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "GET_DETAIL_SHIPPER_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const updateShipper = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_SHIPPER_REQUEST",
      });
      const result = await shipperAPI.updateShipper(id, data);
      console.log("result", result);
      dispatch({
        type: "UPDATE_SHIPPER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_SHIPPER_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const resetShipperList = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_SHIPPER",
    });
  };
};

export const deleteShipper = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DELETE_SHIPPER_REQUEST",
      });
      const result = await shipperAPI.deleteShipper(id);
      console.log("result", result);
      dispatch({
        type: "DELETE_SHIPPER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "DELETE_SHIPPER_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};
