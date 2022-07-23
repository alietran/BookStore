// import { CHANGE_PASSWORD, DELETE_USER, GET_ALL_USER, LOGIN, REGISTER } from '../constants/constant';

// // Quản lý ng dùng
const userLogin = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const stateDefault = {
    userLogin: userLogin,
    loaddingLogin: false,
    errorLogin:null,
    // userList: null,
    // loading: false,
    // errorRegis: null
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
        return { ...state, userLogin: data, loaddingLogin: false };
      }
      case "LOGGIN_FAIL": {
        return {
          ...state,
          loaddingLogin: false,
          errorLogin: action.payload.err,
        };
      }

      default:
        return { ...state };
    }
};
