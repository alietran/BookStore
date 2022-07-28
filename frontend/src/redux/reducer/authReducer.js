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

    case "RESET_USER_LIST": {
      return {
        ...state,
        successCreateUser: "",
      };
    }

    default:
      return { ...state };
  }
};
