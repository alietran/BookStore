import { applyMiddleware, combineReducers, createStore } from "redux";
import { AuthReducer } from "./reducer/authReducer";
import { UserReducer } from "./reducer/userReducer";
import { CateReducer } from "./reducer/cateReducer";
import reduxThunk from "redux-thunk";
import { SubCateReducer } from "./reducer/subCateReducer";

// middleWareSaga.run(rootSaga);

const rootReducer = combineReducers({
  AuthReducer,
  UserReducer,
  CateReducer,
  SubCateReducer,
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));
