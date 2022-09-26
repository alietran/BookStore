import ratingAPI from "../../api/ratingAPI";


export const getRatingDetail = (id) => {
  return (dispatch) => {
    dispatch({
      type: "GET_RATING_DETAIL_REQUEST",
    });
    ratingAPI
      .getRatingDetail(id)
      .then((result) => {
        console.log("result123", result.data);
        dispatch({
          type: "GET_RATING_DETAIL_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        console.log("errror", error);
        dispatch({
          type: "GET_RATING_DETAIL_FAIL",
          payload: {
            error: error.response?.data.message,
          },
        });
      });
  };
};


export const updateRating = (id,data) => {
  console.log("data", data);
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_RATING_REQUEST",
      });
      const result = await ratingAPI.updateRating(id,data);
      console.log("result14", result);
      dispatch({
        type: "UPDATE_RATING_SUCCESS",
        payload: {
          data: result.data.data,
        },
      });
    } catch (error) {
      console.log("error123", error);
      dispatch({
        type: "UPDATE_RATING_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};
export const createRating = (data) => {
  console.log("data", data);
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_RATING_DETAIL_REQUEST",
      });
      const result = await ratingAPI.createRatingDetail(data);
       console.log("result14", result);
      dispatch({
        type: "CREATE_RATING_DETAIL_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log("error123", error);
      dispatch({
        type: "CREATE_RATING_DETAIL_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getAllRating = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_RATING_REQUEST",
    });
    ratingAPI
      .getAllRating()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_RATING_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_RATING_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};


export const resetRating = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_RATING",
    });
  };
};
