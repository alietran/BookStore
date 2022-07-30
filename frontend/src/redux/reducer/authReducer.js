// import { CHANGE_PASSWORD, DELETE_USER, GET_ALL_USER, LOGIN, REGISTER } from '../constants/constant';

// // Quản lý ng dùng
const userLogin = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const stateDefault = {
  userLogin: userLogin,
  loaddingLogin: false,
  errorLogin: null,

  // loading: false,

  loadingCreateUser: false,
  successCreateUser: null,
  errorCreateUser: null,

  successUpdateUserCurrent: null,
  loadingUpdateUserCurrent: false,
  errorUpdateUserCurrent: null,

  successChangePassword: null,
  loadingChangePassword: false,
  errorChangePassword: null,
};

export const AuthReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "LOGGIN_REQUEST": {
      return { ...state, loaddingLogin: true, errorLogin: null };
    }
    case "LOGGIN_SUCCESS": {
      const { data, token } = action.payload;
      console.log("action.payload", action.payload);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token);
      // console.log("userLogin", userLogin);
      return { ...state, userLogin: data, loaddingLogin: false };
    }
    case "LOGGIN_FAIL": {
      return {
        ...state,
        loaddingLogin: false,
        errorLogin: action.payload.err,
      };
    }
    case "CREATE_USER_REQUEST": {
      return { ...state, loadingCreateUser: true, errorCreateUser: null };
    }
    case "CREATE_USER_SUCCESS": {
      return {
        ...state,
        loadingCreateUser: false,
        successCreateUser: action.payload.data,
      };
    }
    case "CREATE_USER_FAIL": {
      return {
        ...state,
        loadingCreateUser: false,
        errorCreateUser: action.payload.err,
      };
    }
    case "UPDATE_USER_CURRENT_REQUEST": {
      return {
        ...state,
        loadingUpdateUserCurrent: true,
        errorUpdateUserCurrent: null,
        successUpdateUserCurrent: null,
      };
    }
    case "UPDATE_USER_CURRENT_SUCCESS": {
      const { data, token, status } = action.payload;
      console.log("data456", data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token);
      return {
        ...state,
        loadingUpdateUserCurrent: false,
        successUpdateUserCurrent: status,
        errorUpdateUserCurrent: null,
        userLogin: data,
      };
    }
    case "UPDATE_USER_CURRENT_FAIL": {
      return {
        ...state,
        loadingUpdateUserCurrent: false,
        errorUpdateUserCurrent: action.payload.error,
        successUpdateUserCurrent: null,
      };
    }
    case "CHANGE_PASSWORD_REQUEST": {
      return {
        ...state,
        loadingChangePassword: true,
        errorChangePassword: null,
        successChangePassword: "",
      };
    }
    case "CHANGE_PASSWORD_SUCCESS": {
      return {
        ...state,
        loadingChangePassword: false,
        successChangePassword: action.payload.status,
        errorChangePassword: null,
      };
    }
    case "CHANGE_PASSWORD_FAIL": {
      return {
        ...state,
        loadingChangePassword: false,
        errorChangePassword: action.payload.error,
        successChangePassword: "",
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        userLogin: null,
        responseRegister: null,
      };
    }
    case "RESET_USER_LIST": {
      return {
        ...state,
        successCreateUser: "",
        successUpdateUserCurrent: "",
        loadingUpdateUserCurrent: false,
        errorUpdateUserCurrent: null,

        successChangePassword: "",
        loadingChangePassword: false,
        errorChangePassword: null,
      };
    }

    default:
      return { ...state };
  }
};
