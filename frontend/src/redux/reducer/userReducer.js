// import { CHANGE_PASSWORD, DELETE_USER, GET_ALL_USER, LOGIN, REGISTER } from '../constants/constant';

// // Quản lý ng dùng
const userLogin = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const stateDefault = {

  loadingCreateUser1: false,
  successCreateUser1: null,
  errorCreateUser1: null,

};

export const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "CREATE_USER1_REQUEST": {
      return { ...state, loadingCreateUser1: true, errorCreateUser1: null };
    }
    case "CREATE_USER1_SUCCESS": {
      return {
        ...state,
        loadingCreateUser1: false,
        successCreateUser1: action.payload.data,
      };
    }
    case "CREATE_USER1_FAIL": {
      return {
        ...state,
        loadingCreateUser1: false,
        errorCreateUser1: action.payload.err,
      };
    }

    default:
      return { ...state };
  }
};
