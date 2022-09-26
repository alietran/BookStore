const stateDefault = {
  rating: [],
  content: [],
  imageRating: [],

  ratingDetail: null,
  loadingRatingDetail: false,
  errorRatingDetail: null,

  createRatingDetail: null,
  loadingCreateRatingDetail: false,
  errorCreateRatingDetail: null,

  updateRatingSuccess: null,
  loadingUpdateRating: false,
  errorUpdateRating: null,

  ratinglist: null,
  loadingRatingList: false,
  errorRatingList: null,
};

export const RatingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "CHANGE_RATING": {
      const { rating, book, imageRating, content, cannel } = action.payload;
      if (cannel === "") {
        state.rating = [];
      } else {
        console.log("action", action.payload);
        let index = state.rating.findIndex((item) => item.book === book);

        if (index !== -1) {
          if (rating !== "") {
            state.rating[index].rating = rating;
          }
          if (content !== "") {
            state.rating[index].content = content;
          }
          if (imageRating !== "") {
            state.rating[index].imageRating = imageRating;
          }
        } else {
          state.rating.push(action.payload);
        }
        state.rating = [...state.rating];
        state.content = [...state.content];
        state.imageRating = [...state.imageRating];
      }

      return { ...state };
    }
    case "PUSH_RATING": {
      // console.log("rating25", action.payload.data);
      return { ...state, rating: action.payload.data };
    }
    case "GET_RATING_DETAIL_REQUEST": {
      return { ...state, loadingRatingDetail: true, errorRatingDetail: null };
    }
    case "GET_RATING_DETAIL_SUCCESS": {
      return {
        ...state,
        ratingDetail: action.payload.data,
        loadingRatingDetail: false,
      };
    }
    case "GET_RATING_DETAIL_FAIL": {
      return {
        ...state,
        errorRatingDetail: action.payload.error,
        loadingRatingDetail: false,
      };
    }
    case "CREATE_RATING_DETAIL_REQUEST": {
      return {
        ...state,
        loadingCreateRatingDetail: true,
        errorCreateRatingDetail: null,
      };
    }
    case "CREATE_RATING_DETAIL_SUCCESS": {
      return {
        ...state,
        createRatingDetail: action.payload.data,
        loadingCreateRatingDetail: false,
      };
    }
    case "CREATE_RATING_DETAIL_FAIL": {
      return {
        ...state,
        errorCreateRatingDetail: action.payload.error,
        loadingCreateRatingDetail: false,
      };
    }
    case "GET_RATING_REQUEST": {
      return { ...state, loadingRatingList: true, errorRatingList: null };
    }
    case "GET_RATING_SUCCESS": {
      return {
        ...state,
        ratinglist: action.payload.data,
        loadingRatingList: false,
      };
    }
    case "GET_RATING_FAIL": {
      return {
        ...state,
        errorRatingList: action.payload.error,
        loadingRatingList: false,
      };
    }
    case "UPDATE_RATING_REQUEST": {
      return { ...state, loadingUpdateRating: true, errorUpdateRating: null };
    }
    case "UPDATE_RATING_SUCCESS": {
      return {
        ...state,
        updateRatingSuccess: action.payload.data,
        loadingUpdateRating: false,
      };
    }
    case "UPDATE_RATING_FAIL": {
      return {
        ...state,
        errorUpdateRating: action.payload.error,
        loadingUpdateRating: false,
      };
    }
    case "RESET_RATING": {
      return {
        ...state,
        createRatingDetail: "",
        loadingCreateRatingDetail: false,
        errorCreateRatingDetail: null,

        loadingUpdateOrder: false,
        successUpdateOrder: "",
        errorUpdateOrder: null,
      };
    }
    default:
      return { ...state };
  }
};
