import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import { NavLink, useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import style from "./AdminTemplate.module.css";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TheatersIcon from "@mui/icons-material/Theaters";
import DiscountIcon from "@mui/icons-material/Discount";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import GroupsIcon from "@mui/icons-material/Groups";
import BookIcon from "@mui/icons-material/Book";
import { Layout, Menu, Breadcrumb, Dropdown } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import MovieIcon from "@mui/icons-material/Movie";
import _ from "lodash";
import BusinessIcon from "@mui/icons-material/Business";
import { SnackbarProvider } from "notistack";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SnackbarProviderCustom from "../../components/Snackbar";
import HailIcon from "@mui/icons-material/Hail";
const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

const AdminTemplate = (props) => {
  //path, exact, Component
  const history = useHistory();
  const { userLogin } = useSelector((state) => state.AuthReducer);
  // const { Component, ...restProps } = props;
  console.log("prop.chil", props.children);
  console.log("userLogin", userLogin);
  // const { userLogin } = useSelector((state) => state.UserReducer);
  // console.log(userLogin);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const onCollapse = (collapsed) => {
    // console.log(collapsed);
    setCollapsed(collapsed);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // if (!localStorage.getItem("user")) {
  //   alert("Bạn không có quyền truy cập vào trang này !");
  //   return <Redirect to="/" />;
  // }

  // if (
  //   userLogin.roles !== "admin" &&
  //   userLogin.roles !== "moderator"

  // ) {
  //   alert("Bạn không có quyền truy cập vào trang này !");
  //   // return <Redirect to="/" />;
  // }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink to="/admin/account">Xem thông tin</NavLink>
      </Menu.Item>

      <Menu.Item key="2" className="mr-3">
        {" "}
        <button
          onClick={() => {
            // // localStorage.removeItem("profile");
            // // localStorage.removeItem("user");
            // // localStorage.removeItem("token");
            history.push("/admin/login");
            dispatch({ type: "LOGOUT" });
          }}
          className="text-blue-800"
        >
          Đăng xuất
        </button>{" "}
      </Menu.Item>
    </Menu>
  );

  const operations = (
    <Fragment>
      {/* {!_.isEmpty(userLogin) ? ( */}
      <Fragment>
        <div className="flex justify-end">
          <span className="font-bold">{userLogin?.user.idRole.roleName}</span>
          <Dropdown overlay={menu} trigger={["click"]}>
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-2xl ml-5 rounded-full bg-red-200 ant-dropdown-link
                onClick={(e) => e.preventDefault()}"
            >
              {/* {userLogin.userName.substr(0, 1)} */}
              <img
                src={userLogin?.user.avatar}
                alt="avatar"
                className="rounded-full"
              />
            </div>
          </Dropdown>
        </div>
      </Fragment>

      {/* : (
        ""
      )} */}
    </Fragment>
  );

  // if (userLogin.user.idRole.roleName === "admin"){
  //  return <>{props.children}</>;
  // }
  return (
    <SnackbarProviderCustom
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Fragment>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo p-4 ">
              <img
                src="/img/logo_black.png"
                className="h-12 w-full"
                alt="..."
              />
            </div>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              {userLogin.user.idRole.roleName === "Admin" ? (
                <>
                  {" "}
                  <Menu.Item key="0" icon={<EqualizerIcon />}>
                    <NavLink to="/admin/overview">Tổng quan</NavLink>
                  </Menu.Item>
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    <NavLink to="/admin/users">Quản lý người dùng</NavLink>
                  </Menu.Item>
                  <Menu.Item key="8" icon={<ReceiptLongIcon />}>
                    <NavLink to="/admin/receipts/list">
                      Quản lý phiếu nhập
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="7" icon={<BookIcon />}>
                    <NavLink to="/admin/books">Sách</NavLink>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<CategoryIcon />}>
                    <NavLink to="/admin/categories"></NavLink>Thể loại
                  </Menu.Item>
                  <Menu.Item key="3" icon={<BusinessIcon />}>
                    <NavLink to="/admin/suppliers">Nhà cung cấp</NavLink>
                  </Menu.Item>
                  {/* </SubMenu> */}

                  <Menu.Item key="4" icon={<GroupsIcon />}>
                    <NavLink to="/admin/shippers">Shipper</NavLink>
                  </Menu.Item>
                  <Menu.Item key="5" icon={<ReceiptIcon />}>
                    <NavLink to="/admin/authors">Tác giả</NavLink>
                  </Menu.Item>
                  <Menu.Item key="6" icon={<DiscountIcon />}>
                    <NavLink to="/admin/promotions">Khuyến mãi</NavLink>
                  </Menu.Item>
                  <Menu.Item key="9" icon={<ReceiptIcon />}>
                    <NavLink to="/admin/orders">Đơn hàng</NavLink>
                  </Menu.Item>
                  <Menu.Item key="10" icon={<ReviewsIcon />}>
                    <NavLink to="/admin/rating">Đánh giá</NavLink>
                  </Menu.Item>
                </>
              ) : (
                ""
              )}

              {userLogin.user.idRole.roleName === "NV Kho" ? (
                <>
                  {" "}
                  <Menu.Item key="8" icon={<UserOutlined />}>
                    <NavLink to="/admin/receipts/list">
                      Quản lý phiếu nhập
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="7" icon={<ReceiptIcon />}>
                    <NavLink to="/admin/books">Sách</NavLink>
                  </Menu.Item>
                </>
              ) : (
                ""
              )}
              {userLogin.user.idRole.roleName === "NV Bán Hàng" ? (
                <>
                  <Menu.Item key="7" icon={<ReceiptIcon />}>
                    <NavLink to="/admin/books">Sách</NavLink>
                  </Menu.Item>
                </>
              ) : (
                ""
              )}
              {/* <Menu.Item key="9" icon={<ReceiptIcon />}>
                <NavLink to="/admin/paymentMethod">Thanh toán</NavLink>
              </Menu.Item> */}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header
              className="bg-white site-layout-background"
              style={{ padding: 0, backgroundColor: "white " }}
            >
              <div className="text-right pr-10 pt-1">{operations}</div>
            </Header>
            <Content style={{ margin: "20px 16px" }}>
              {/* <Breadcrumb style={{ margin: "16px 0" }}>
                      <Breadcrumb.Item>User</Breadcrumb.Item>
                      <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}

              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: "85vh" }}
              >
                {props.children}
                {/* <Component {...propsRoute} /> */}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Fragment>
    </SnackbarProviderCustom>
  );
};

export default AdminTemplate;
