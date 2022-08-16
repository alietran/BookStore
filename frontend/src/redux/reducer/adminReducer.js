const stateDefault = {
  usersList: null,
  loadingUsersList: false,
  errorUsersList: null,

  accountList: null,
  loadingAccountList: false,
  errorAccountList: null,
  // successCreateAdmin: null,

  userRoleList: null,

  loadingUpdateAdmin: false,
  successUpdateAdmin: null,
  errorUpdateAdmin: null,

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

    case "GET_ALL_ACCOUNT_REQUEST": {
      return { ...state, loadingAccountList: true, errorAccountList: null };
    }
    case "GET_ALL_ACCOUNT_SUCCESS": {
      return {
        ...state,
        accountList: action.payload.data,
        loadingAccountList: false,
      };
    }
    case "GET_ALL_ACCOUNT_FAIL": {
      return {
        ...state,
        errorAccountList: action.payload.error,
        loadingAccountList: false,
      };
    }

    case "GET_ROLE_SUCCESS": {
      console.log("action", action);
      return {
        ...state,
        userRoleList: action.payload.data,
      };
    }

    case "UPDATE_ADMIN_REQUEST": {
      return { ...state, loadingUpdateAdmin: true, errorUpdateAdmin: null };
    }
    case "UPDATE_ADMIN_SUCCESS": {
      return {
        ...state,
        successUpdateAdmin: action.payload.data,
        loadingUpdateAdmin: false,
      };
    }
    case "UPDATE_ADMIN_FAIL": {
      return {
        ...state,
        errorUpdateAdmin: action.payload.error,
        loadingUpdateAdmin: false,
      };
    }
    case "RESET_USER_LIST_UPDATE": {
      return {
        ...state,
        successUpdateAdmin: "",
      };
    }
    case "DELETE_USER_REQUEST": {
      return { ...state, loadingDeleteUser: true, errorUpdateAdmin: null };
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
        errorUpdateAdmin: action.payload.error,
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
