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


export const createRating = (data) => {
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
      console.log("error", error);
      dispatch({
        type: "CREATE_RATING_DETAIL_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};