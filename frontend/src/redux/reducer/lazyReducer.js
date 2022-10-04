const initialState = {
  islazyLoading: false,
};

export const LazyReducer =  (state = initialState, action) => {
  switch (action.type) {
    case "LAZY_LOADING_MOUT":
      return { ...state, lazyLoading: true };
    case "LOADING_LAZY_UNMOUNT":
      return { ...state, lazyLoading: false };

    default:
      return state;
  }
};
