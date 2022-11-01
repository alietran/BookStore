const stateDefault = {
  promotionList: null,
  loadingPromotionList: false,
  errorPromotionList: null,

  loadingCreatePromotion: false,
  successCreatePromotion: null,
  errorCreatePromotion: null,

  loadingDetailPromotion: false,
  successDetailPromotion: null,
  errorDetailPromotion: null,

  loadingUpdatePromotion: false,
  successUpdatePromotion: null,
  errorUpdatePromotion: null,

  loadingDeletePromotion: false,
  successDeletePromotion: null,
  errorDeletePromotion: null,
};

export const PromotionReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_PROMOTION_REQUEST": {
      return { ...state, loadingPromotionList: true, errorPromotionList: null };
    }
    case "GET_PROMOTION_SUCCESS": {
      return {
        ...state,
        promotionList: action.payload.data,
        loadingPromotionList: false,
      };
    }
    case "GET_PROMOTION_FAIL": {
      return {
        ...state,
        errorPromotionList: action.payload.error,
        loadingPromotionList: false,
      };
    }

    case "CREATE_PROMOTION_REQUEST": {
      return {
        ...state,
        loadingCreatePromotion: true,
        errorCreatePromotion: null,
      };
    }
    case "CREATE_PROMOTION_SUCCESS": {
      return {
        ...state,
        successCreatePromotion: action.payload.data,
        loadingCreatePromotion: false,
      };
    }
    case "CREATE_PROMOTION_FAIL": {
      return {
        ...state,
        errorCreatePromotion: action.payload.error,
        loadingCreatePromotion: false,
      };
    }

    case "GET_DETAIL_PROMOTION_REQUEST": {
      return {
        ...state,
        loadingDetailPromotion: true,
        errorDetailPromotion: null,
      };
    }
    case "GET_DETAIL_PROMOTION_SUCCESS": {
      return {
        ...state,
        successDetailPromotion: action.payload.data,
        loadingDetailPromotion: false,
      };
    }
    case "GET_DETAIL_PROMOTION_FAIL": {
      return {
        ...state,
        errorDetailPromotion: action.payload.error,
        loadingDetailPromotion: false,
      };
    }

    case "UPDATE_PROMOTION_REQUEST": {
      return {
        ...state,
        loadingUpdatePromotion: true,
        errorUpdatePromotion: null,
      };
    }
    case "UPDATE_PROMOTION_SUCCESS": {
      return {
        ...state,
        successUpdatePromotion: action.payload.data,
        loadingUpdatePromotion: false,
      };
    }
    case "UPDATE_PROMOTION_FAIL": {
      return {
        ...state,
        errorUpdatePromotion: action.payload.error,
        loadingUpdatePromotion: false,
      };
    }
    case "DELETE_PROMOTION_REQUEST": {
      return {
        ...state,
        loadingDeletePromotion: true,
        errorDeletePromotion: null,
      };
    }
    case "DELETE_PROMOTION_SUCCESS": {
      return {
        ...state,
        successDeletePromotion: action.payload.data,
        loadingDeletePromotion: false,
      };
    }
    case "DELETE_PROMOTION_FAIL": {
      return {
        ...state,
        errorDeletePromotion: action.payload.error,
        loadingDeletePromotion: false,
      };
    }

    case "RESET_PROMOTION": {
      return {
        ...state,
        errorPromotionList: null,

        loadingCreatePromotion: false,
        successCreatePromotion: "",
        errorCreatePromotion: null,

        loadingUpdatePromotion: false,
        successUpdatePromotion: "",
        errorUpdatePromotion: null,
      };
    }

    default:
      return { ...state };
  }
};
