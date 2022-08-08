
import promotionAPI from "../../api/promotionAPI";

export const getPromotionList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_PROMOTION_REQUEST",
    });
    promotionAPI
      .getAllPromotion()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_PROMOTION_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_PROMOTION_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const createPromotion = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_PROMOTION_REQUEST",
      });
      const result = await promotionAPI.createPromotion(data);
       console.log("CREATE_PROMOTION_SUCCESS", data);
      dispatch({
        type: "CREATE_PROMOTION_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: "CREATE_PROMOTION_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};


export const getDetailPromotion = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_DETAIL_PROMOTION_REQUEST",
      });
      const result = await promotionAPI.getDetailPromotion(id);
      console.log("result", result);
      dispatch({
        type: "GET_DETAIL_PROMOTION_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "GET_DETAIL_PROMOTION_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const updatePromotion = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_PROMOTION_REQUEST",
      });
      const result = await promotionAPI.updatePromotion(id, data);
      console.log("result", result);
      dispatch({
        type: "UPDATE_PROMOTION_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_PROMOTION_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const deletePromotion = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DELETE_PROMOTION_REQUEST",
      });
      const result = await promotionAPI.deletePromotion(id);
      console.log("result", result);
      dispatch({
        type: "DELETE_PROMOTION_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "DELETE_PROMOTION_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};