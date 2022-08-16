import addressAPI from "../../api/addressAPI";

export const getListProvinces = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ADDRESS_PROVINCES_REQUEST",
    });
    addressAPI
      .getListProvinces()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_ADDRESS_PROVINCES_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ADDRESS_PROVINCES_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};
