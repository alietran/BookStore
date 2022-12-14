// import { CHANGE_PASSWORD, DELETE_USER, GET_ALL_USER, LOGIN, REGISTER } from '../constants/constant';

// // Quản lý ng dùng
// let userLogin = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

const stateDefault = {
  loadingCreateUser: false,
  successCreateUser: null,
  errorCreateUser: null,

  loadingUpdateUser: false,
  successUpdateUser: null,
  errorUpdateUser: null,

  loadingUpdateUserCurrent: false,
  successUpdateUserCurrent: null,
  errorUpdateUserCurrent: null,

  loginUserSucces: localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null
};

export const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "LOGIN_USER":{
      return {
        ...state,
        loginUserSucces: action.payload.data,
     
      };
    }


    case "CREATE_USER1_REQUEST": {
      return { ...state, loadingCreateUser: true, errorCreateUser: null };
    }
    case "CREATE_USER1_SUCCESS": {
      return {
        ...state,
        loadingCreateUser: false,
        successCreateUser: action.payload.data,
      };
    }
    case "CREATE_USER1_FAIL": {
      return {
        ...state,
        loadingCreateUser: false,
        errorCreateUser: action.payload.err,
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
    case "UPDATE_USER_HOME_CURRENT_REQUEST": {
      return {
        ...state,
        loadingUpdateUserCurrent: true,
        errorUpdateUserCurrent: null,
      };
    }
    case "UPDATE_USER_HOME_CURRENT_SUCCESS": {
      const { data } = action.payload;
      console.log("action.payload", action.payload.data);
      let userLogin = JSON.parse(localStorage.getItem("user"));
      userLogin = { ...userLogin, user: data };
      localStorage.setItem("user", JSON.stringify(userLogin));
      return {
        ...state,
        successUpdateUserCurrent: data,
        loadingUpdateUserCurrent: false,
      };
    }
    case "UPDATE_USER_HOME_CURRENT_FAIL": {
      return {
        ...state,
        errorUpdateUserCurrent: action.payload.error,
        loadingUpdateUserCurrent: false,
      };
    }
    default:
      return { ...state };
  }
};
