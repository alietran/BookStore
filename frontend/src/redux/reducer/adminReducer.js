const stateDefault = {
  usersList: null,
  loadingUsersList: false,
  errorUsersList: null,

  // successCreateAdmin: null,

  userRoleList: null,

  loadingUpdateUser: false,
  successUpdateUser: null,
  errorUpdateUser: null,

  loadingDeleteUser: false,
  successDeleteUser: null,
  errorDeleteUser: null,

  userDetail: null,
  errorDetailUser: null,
};

export const AdminReducer = (state = stateDefault, action) => {
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

    case "GET_ROLE_SUCCESS": {
      console.log("action", action);
      return {
        ...state,
        userRoleList: action.payload.data,
      };
    }

    case "UPDATE_USER_REQUEST": {
      return { ...state, loadingUpdateUser: true, errorUpdateUser: null };
    }
    case "UPDATE_USER_SUCCESS": {
      return {
        ...state,
        successUpdateUser: action.payload.data,
        loadingUpdateUser: false,
      };
    }
    case "UPDATE_USER_FAIL": {
      return {
        ...state,
        errorUpdateUser: action.payload.error,
        loadingUpdateUser: false,
      };
    }
    case "RESET_USER_LIST_UPDATE": {
      return {
        ...state,
        successUpdateUser: "",
      };
    }
    case "DELETE_USER_REQUEST": {
      return { ...state, loadingDeleteUser: true, errorUpdateUser: null };
    }
    case "DELETE_USER_SUCCESS": {
      return {
        ...state,
        successDeleteUser: action.payload.data,
        loadingDeleteUser: false,
      };
    }
    case "DELETE_USER_FAIL": {
      return {
        ...state,
        errorUpdateUser: action.payload.error,
        loadingDeleteUser: false,
      };
    }
    case "GET_DETAIL_USER_REQUEST": {
      return { ...state };
    }
    case "GET_DETAIL_USER_SUCCESS": {
      return {
        ...state,
        usersList: action.payload.data,
        userDetail: false,
      };
    }
    case "GET_DETAIL_USER_FAIL": {
      return {
        ...state,
        errorDetailUser: action.payload.error,
    
      };
    }

    default:
      return { ...state };
  }
};
