const stateDefault = {
  rating: [],
  content: [],
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
    default:
      return { ...state };
  }
};
