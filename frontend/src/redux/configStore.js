import { applyMiddleware, combineReducers, createStore } from "redux";
import { AuthReducer } from "./reducer/authReducer";
import { AdminReducer } from "./reducer/adminReducer";
import { CateReducer } from "./reducer/cateReducer";
import reduxThunk from "redux-thunk";
import { SubCateReducer } from "./reducer/subCateReducer";
import { UserReducer } from "./reducer/userReducer";
import { SupplierReducer } from "./reducer/supplierReducer";
import { ShipperReducer } from "./reducer/shipperReducer";
import { AuthorReducer } from "./reducer/authorReducer";
import { PromotionReducer } from "./reducer/promotionReducer";
import { BookReducer } from "./reducer/bookReducer";

// middleWareSaga.run(rootSaga);

const rootReducer = combineReducers({
  AuthReducer,
  AdminReducer,
  CateReducer,
  SubCateReducer,
  UserReducer,
  SupplierReducer,
  ShipperReducer,
  AuthorReducer,
  PromotionReducer,
  BookReducer,
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));
