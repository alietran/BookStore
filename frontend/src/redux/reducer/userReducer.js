const stateDefault = {
  usersList: null,
  loadingUsersList: false,
  errorUsersList: null,

 
};

export const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_USER_LIST_REQUEST": {
      return { ...state, loadingUsersList: true, errorUsersList: null };
    }
    case "GET_USER_LIST_SUCCESS": {
      return {
        ...state,
        usersList: action.payload.data,
        loadingUsersList: false,
      };
    }
    case "GET_USER_LIST_FAIL": {
      return {
        ...state,
        errorUsersList: action.payload.error,
        loadingUsersList: false,
      };
    }
    case "RESET_USER_LIST": {
      return {
        ...state,
        errorUsersList: null,
      
      };
    }
    default:
      return { ...state };
  }
};
