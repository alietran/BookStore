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
import { ReceiptReducer } from "./reducer/receiptReducer";
import { AddressReducer } from "./reducer/addressReducer";
import { ReceiptDetailReducer } from "./reducer/receiptDetailReducer";
import { CartReducer } from "./reducer/cartReducer";
import { OrderReducer } from "./reducer/orderReducer";
import { OrderDetailReducer } from "./reducer/orderDetailReducer";
import { PaymentReducer } from "./reducer/paymentReducer";
import { RatingReducer } from "./reducer/ratingReducer";
import { LazyReducer } from "./reducer/lazyReducer";



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
  ReceiptReducer,
  AddressReducer,
  ReceiptDetailReducer,
  CartReducer,
  OrderReducer,
  OrderDetailReducer,
  PaymentReducer,
  RatingReducer,
  LazyReducer,
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));
