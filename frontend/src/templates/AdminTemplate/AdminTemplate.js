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
import { Layout, Menu, Breadcrumb, Dropdown, Badge, Popover } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import moment from "moment";

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
import {
  getOrderList,
  resetOrder,
  updateOrder,
} from "../../redux/action/orderAction";
const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;
const AdminTemplate = (props) => {
  //path, exact, Component
  const history = useHistory();
  const { userLogin } = useSelector((state) => state.AuthReducer);
  // const { Component, ...restProps } = props;
  const { orderList } = useSelector((state) => state.OrderReducer);
  const [countNewOrder, setCountNewOrder] = useState(0);
  const [newOrder, setNewOrder] = useState();
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
    // get list user l???n ?????u
    if (!orderList) {
      dispatch(getOrderList());
    }
    // setLoading(false);
    return () => dispatch(resetOrder());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const newOrderItem = orderList?.data?.filter(
      (item) => item.isSeen === false
    );
    console.log("newOrderItem", newOrderItem);
    setNewOrder(newOrderItem);
    setCountNewOrder(newOrderItem?.length);
  }, [orderList]);
  const handleChangeSeen = (id) => {
    dispatch(
      updateOrder(id, {
        isSeen: true,
      })
    );
  };
  // console.log("countNewOrder", countNewOrder);
  // const countNewOrder = orderList?.data?.filter(
  //   (item) => item.isSeen === false
  // ).length;
  // if (!localStorage.getItem("user")) {
  //   alert("B???n kh??ng c?? quy???n truy c???p v??o trang n??y !");
  //   return <Redirect to="/" />;
  // }

  // if (
  //   userLogin.roles !== "admin" &&
  //   userLogin.roles !== "moderator"

  // ) {
  //   alert("B???n kh??ng c?? quy???n truy c???p v??o trang n??y !");
  //   // return <Redirect to="/" />;
  // }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink to="/admin/account">Xem th??ng tin</NavLink>
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
          ????ng xu???t
        </button>{" "}
      </Menu.Item>
    </Menu>
  );
  const content = newOrder?.map((item, index) => {
    return (
      <div className="flex w-40">
        <p>
          <img src={item?.user?.avatar} alt="" height={80} width={80} />
        </p>
        <NavLink
          to={`/admin/orders/detail/${item.id}`}
          className="ml-3 text-black "
          onClick={() => handleChangeSeen(item.id)}
        >
          {item?.user.phoneNumber
            ? item?.user.phoneNumber
            : item?.user.fullName}{" "}
          ???? ?????t ????n h??ng m???i l??c{" "}
          {moment(item.createdAt).format("DD-MM-YYYY hh:mm a")}
        </NavLink>
        <hr />

        {/* <p>Content</p> */}
      </div>
    );
  });
  const operations = (
    <Fragment>
      {/* {!_.isEmpty(userLogin) ? ( */}
      <Fragment>
        <div className="flex justify-end">
          <div className="mr-4">
            <Popover content={content}>
              <Badge count={countNewOrder}>
                <NotificationOutlined style={{ fontSize: 16 }} />
              </Badge>
            </Popover>
          </div>

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
                src="/img/logo_black (2).png"
                className="h-12 w-full"
                alt="..."
              />
            </div>
            <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
              {userLogin.user.idRole.roleName === "Admin" ? (
                <>
                  {" "}
                  <Menu.Item key="0" icon={<EqualizerIcon />}>
                    <NavLink to="/admin/overview">T???ng quan</NavLink>
                  </Menu.Item>
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    <NavLink to="/admin/users">Qu???n l?? ng?????i d??ng</NavLink>
                  </Menu.Item>
                  <Menu.Item key="8" icon={<ReceiptLongIcon />}>
                    <NavLink to="/admin/receipts/list">
                      Qu???n l?? phi???u nh???p
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="7" icon={<BookIcon />}>
                    <NavLink to="/admin/books">S??ch</NavLink>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<CategoryIcon />}>
                    <NavLink to="/admin/categories"></NavLink>Th??? lo???i
                  </Menu.Item>
                  <Menu.Item key="3" icon={<BusinessIcon />}>
                    <NavLink to="/admin/suppliers">Nh?? cung c???p</NavLink>
                  </Menu.Item>
                  {/* </SubMenu> */}
                  <Menu.Item key="4" icon={<GroupsIcon />}>
                    <NavLink to="/admin/shippers">Shipper</NavLink>
                  </Menu.Item>
                  <Menu.Item key="5" icon={<ReceiptIcon />}>
                    <NavLink to="/admin/authors">T??c gi???</NavLink>
                  </Menu.Item>
                  <Menu.Item key="6" icon={<DiscountIcon />}>
                    <NavLink to="/admin/promotions">Khuy???n m??i</NavLink>
                  </Menu.Item>
                  <Menu.Item key="9" icon={<ReceiptIcon />}>
                    <NavLink to="/admin/orders">????n h??ng</NavLink>
                  </Menu.Item>
                  <Menu.Item key="10" icon={<ReviewsIcon />}>
                    <NavLink to="/admin/rating">????nh gi??</NavLink>
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
                      Qu???n l?? phi???u nh???p
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="7" icon={<ReceiptIcon />}>
                    <NavLink to="/admin/books">S??ch</NavLink>
                  </Menu.Item>
                </>
              ) : (
                ""
              )}
              {userLogin.user.idRole.roleName === "NV B??n H??ng" ? (
                <>
                  <Menu.Item key="9" icon={<ReceiptIcon />}>
                    <NavLink to="/admin/orders">????n h??ng</NavLink>
                  </Menu.Item>
                </>
              ) : (
                ""
              )}
              {/* <Menu.Item key="9" icon={<ReceiptIcon />}>
                <NavLink to="/admin/paymentMethod">Thanh to??n</NavLink>
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
              Ant Design ??2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Fragment>
    </SnackbarProviderCustom>
  );
};

export default AdminTemplate;
