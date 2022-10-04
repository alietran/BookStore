import logo from "./logo.svg";
import "./App.css";
import shape from "./theme/shape";
import palette from "./theme/palette";
import typography from "./theme/typography";
import shadows, { customShadows } from "./theme/shadows";
import componentsOverride from "./theme/overrides";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserManager from "./pages/Admin/UserManager/UserManager";
import Swal from "sweetalert2";
import { useEffect, useMemo, useState, Suspense } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import LoginAdmin from "./pages/Auth/Login";
import CategoryManager from "./pages/Admin/CategoryManager/CategoryManager";
import SubCategoryManager from "./pages/Admin/SubCategoryManager/SubCategoryManager";
import AuthorManager from "./pages/Admin/AuthorManager/AuthorManager";
import { useHistory } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";

import AdminRoute from "./guards/AdminRoute";
import CreateUser from "./pages/Admin/UserManager/CreateUser/CreateUser";

import UserAccount from "./pages/Admin/Account";
import Login from "./pages/Login";
import SupplierManager from "./pages/Admin/SupplierManager/SupplierManager";
import ShipperManager from "./pages/Admin/Shipper/ShipperManager";
import PromotionManager from "./pages/Admin/PromotionManager/PromotionManager";
import BookManager from "./pages/Admin/Book/BookManager";

import Checkout from "./pages/HomePage/Checkout";

import ReceiptManager from "./pages/Admin/ReceiptManager/ReceiptManager";
import CreateReceipt from "./pages/Admin/ReceiptManager/CreateReceipt/CreateReceipt";
import ProductDetail from "./pages/HomePage/ProductDetail/ProductDetail";

import DetailReceipt from "./pages/Admin/ReceiptManager/DetailReceipt/DetailReceipt";
import Cart from "./pages/HomePage/Cart/Cart";
import PaymentMethod from "./pages/HomePage/Checkout/PaymentMethod/PaymentMethod";
import PaymentManager from "./pages/Admin/PaymentManager/PaymentManager";
import ConfirmOrder from "./pages/HomePage/Checkout/ConfirmOrder/ConfirmOrder";
import Overview from "./pages/Admin/Overview/Overview";
import OrderManager from "./pages/Admin/Order/OrderManager";
import OrderDetail from "./pages/Admin/Order/OrderDetail/OrderDetail";
import UserInfo from "./pages/HomePage/UserInfo/UserInfo";
import OrderHistoryDetail from "./pages/HomePage/UserInfo/OrderHistory/OrderHistoryDetail";
import LoginShipper from "./pages/Shipper/LoginShipper";
import OrderListShipper from "./pages/Shipper/OrderListShipper";
import Search from "./pages/HomePage/Search/Search";
import WarehouseRoute from "./guards/WarehouseRoute";
import OrderShipperDetail from "./pages/Shipper/OrderShipperDetail";
import RatingManager from "./pages/Admin/Rating/RatingManager";
import { useDispatch } from "react-redux";
import TriggerLoadingLazy from "./components/TriggerLoadingLazy/TriggerLoadingLazy";
import Loading from "./components/Loading/Loading";

function App() {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    []
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:8080/api/v1/users/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log("resObject", resObject);
          setUser(resObject.user);
          if (resObject?.user.active) {
            dispatch({
              type: "LOGIN_USER",
              payload: {
                data: resObject,
              },
            });
            localStorage.setItem("user", JSON.stringify(resObject));
            localStorage.setItem("token", resObject.token);
          } else {
            // Swal.fire({
            //   icon: "error",
            //   title: "Lỗi...",
            //   text: "Tài khoản của bạn đã bị khóa!",
            // });
            // history.push("/login");
          }
        })
        .catch((err) => {});
    };
    getUser();
  }, []);
  // console.log("user123456", user);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Loading />{" "}
        <Suspense fallback={<TriggerLoadingLazy />} >
          <Switch>
            <Route
              exact
              path={[
                "/shipper",
                "/orderListShipper",
                "/orderListShipper/:orderId",
              ]}
            >
              <Route exact path="/shipper" component={LoginShipper} />
              <Route
                exact
                path="/orderListShipper"
                component={OrderListShipper}
              />
              <Route
                exact
                path="/orderListShipper/:orderId"
                component={OrderShipperDetail}
              />
            </Route>
            <Route
              exact
              path={[
                "/",
                "/phone",
                "/login",
                "/checkout",
                "/productDetail/:id",
                "/cart",
                "/confirmOrder/:id",
                "/userInfo",
                "/orderDetail/:receiptId",
                "/search",
              ]}
            >
              <MainLayout>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/checkout" component={Checkout} />
                <Route
                  exact
                  path="/productDetail/:id"
                  component={ProductDetail}
                />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/userInfo" component={UserInfo} />
                <Route
                  exact
                  path="/confirmOrder/:id"
                  component={ConfirmOrder}
                />
                <Route
                  exact
                  path="/orderDetail/:receiptId"
                  component={OrderHistoryDetail}
                />
              </MainLayout>
            </Route>
            <Route exact path="/admin/login" component={LoginAdmin} />
            <Route
              exact
              path={[
                "/admin/users",
                "/admin/receipts/list",
                "/admin/receipts/detail/:receiptId",
                "/admin/orders/detail/:orderId",
                "/admin/receipts/create",
                "/admin/users/createUser",
                "/admin/categories",
                "/admin/account",
                "/admin/suppliers",
                "/admin/shippers",
                "/admin/authors",
                "/admin/promotions",
                "/admin/books",
                "/admin/paymentMethod",
                "/admin/overview",
                "/admin/orders",
                "/admin/rating",
              ]}
            >
              <AdminTemplate>
                <AdminRoute exact path="/admin/users" component={UserManager} />
                <AdminRoute
                  exact
                  path="/admin/receipts/list"
                  component={ReceiptManager}
                />
                <WarehouseRoute
                  exact
                  path="/admin/overview"
                  component={Overview}
                />

                <AdminRoute
                  exact
                  path="/admin/receipts/create"
                  component={CreateReceipt}
                />
                <AdminRoute
                  exact
                  path="/admin/rating"
                  component={RatingManager}
                />
                <AdminRoute
                  exact
                  path="/admin/receipts/detail/:receiptId"
                  component={DetailReceipt}
                />
                <AdminRoute
                  exact
                  path="/admin/orders/detail/:orderId"
                  component={OrderDetail}
                />
                <AdminRoute
                  exact
                  path="/admin/users/createUser"
                  component={CreateUser}
                />
                <AdminRoute
                  exact
                  path="/admin/categories"
                  component={CategoryManager}
                />
                <AdminRoute
                  exact
                  path="/admin/account"
                  component={UserAccount}
                />

                {/* </AdminTemplate> */}
                <AdminRoute
                  exact
                  path="/admin/suppliers"
                  component={SupplierManager}
                />
                <AdminRoute
                  exact
                  path="/admin/shippers"
                  component={ShipperManager}
                />
                <AdminRoute
                  exact
                  path="/admin/authors"
                  component={AuthorManager}
                />
                <AdminRoute
                  exact
                  path="/admin/promotions"
                  component={PromotionManager}
                />
                {/* <AdminRoute
                exact
                path="/admin/paymentMethod"
                component={PaymentManager}
              /> */}
                <AdminRoute exact path="/admin/books" component={BookManager} />
                <AdminRoute
                  exact
                  path="/admin/orders"
                  component={OrderManager}
                />
              </AdminTemplate>
            </Route>
          </Switch>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
