const stateDefault = {
  rating: [],
  content: [],

  ratingDetail: null,
  loadingRatingDetail: false,
  errorRatingDetail: null,

  createRatingDetail: null,
  loadingCreateRatingDetail: false,
  errorCreateRatingDetail: null,
};

export const RatingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "CHANGE_RATING": {
      const { rating, book, content, cannel } = action.payload;
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
        } else {
          state.rating.push(action.payload);
        }
        state.rating = [...state.rating];
        state.content = [...state.content];
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
      return { ...state, loadingCreateRatingDetail: true, errorCreateRatingDetail: null };
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
    default:
      return { ...state };
  }
};
