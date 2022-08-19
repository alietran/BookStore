import supplierAPI from "../../api/supplierAPI";

export const getSupplierList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_SUPPLIER_REQUEST",
    });
    supplierAPI
      .getAllSupplier()
      .then((result) => {
        console.log("result1234", result);
        dispatch({
          type: "GET_SUPPLIER_SUCCESS",
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_SUPPLIER_FAIL",
          payload: {
            error: error,
          },
        });
      });
  };
};

export const createSupplier = (data) => {
  return async (dispatch) => {
    console.log("data dispatch", data);
    try {
      dispatch({
        type: "CREATE_SUPPLIER_REQUEST",
      });
      const result = await supplierAPI.postCreateSupplier(data);
      console.log("create supplier", result);
      dispatch({
        type: "CREATE_SUPPLIER_SUCCESS",

        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "CREATE_SUPPLIER_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

// export const getDetailCate = (id) => {
//   return async (dispatch) => {
//     try {
//       dispatch({
//         type: "GET_DETAIL_CATE_REQUEST",
//       });
//       const result = await cateAPI.getDetailCategory(id);
//       console.log("result", result);
//       dispatch({
//         type: "GET_DETAIL_CATE_SUCCESS",
//         payload: {
//           data: result.data,
//         },
//       });
//     } catch (error) {
//       dispatch({
//         type: "GET_DETAIL_CATE_FAIL",
//         payload: {
//           error: error.response?.data.message,
//         },
//       });
//     }
//   };
// };

export const updateSupplier = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_SUPPLIER_REQUEST",
      });
      const result = await supplierAPI.updateSupplier(id, data);
      console.log("result", result);
      dispatch({
        type: "UPDATE_SUPPLIER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_SUPPLIER_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const resetSupplierList = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_SUPPLIER",
    });
  };
};

export const deleteSupplier = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DELETE_SUPPLIER_REQUEST",
      });
      const result = await supplierAPI.deleteSupplier(id);
      console.log("result", result);
      dispatch({
        type: "DELETE_SUPPLIER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "DELETE_SUPPLIER_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};
