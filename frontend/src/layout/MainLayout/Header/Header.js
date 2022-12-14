import React, { useState, useEffect } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Fragment } from "react";
import "antd/dist/antd.css";
import { Popover, Transition } from "@headlessui/react";
import { DownOutlined } from "@ant-design/icons";
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { NavLink, useHistory } from "react-router-dom";
import { Box, Container, maxWidth } from "@mui/system";
import {
  Badge,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./style";
import { OutlinedInput } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  getCateList,
  resetCateList,
} from "../../../redux/action/categoryAction";
import { styled } from "@mui/material/styles";
import { Dropdown, Menu, Space } from "antd";
import _ from "lodash";
import { getBookList } from "../../../redux/action/bookAction";

export default function Header() {
  const { cateList } = useSelector((state) => state.CateReducer);
  console.log("cateList", cateList);

  const { bookList } = useSelector((state) => state.BookReducer);
  const { loginUserSucces } = useSelector((state) => state.UserReducer);
  // const loginUserSucces = JSON.parse(localStorage.getItem("user"));
  console.log("loginUserSucces", loginUserSucces);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    if (!bookList) {
      dispatch(getBookList());
    }
  }, [bookList]);

  const classes = useStyles();
  let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  let quanityCart = cart.reduce((total, item) => {
    return (total = total + item.quantity);
  }, 0);

  const [userLogin, setUserLogin] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  console.log("userLogin", userLogin);
  // useEffect(() => {

  // }, [userLogin]);

  // let userLogin = JSON.parse(localStorage.getItem("user"));
  let shipperLogin = JSON.parse(localStorage.getItem("shipper"));
  // console.log(
  //   "userLogin?.user?.idRole?.roleName",
  //   userLogin?.user?.idRole?.roleName
  // );
  if (
    loginUserSucces?.user?.idRole?.roleName !== "Admin" &&
    loginUserSucces?.user?.idRole?.roleName !== "NV Kho" &&
    shipperLogin?.user?.role !== "Shipper"
  ) {
    // window.location.reload()
    // console.log("3435345")
    // T???o ra token cho user ???? login, m???i user login th?? ch??? t???n t???i 1 token
    //  console.log("userLogin34664")
    const crisp_token_id_user = `token_${loginUserSucces?.user._id}`;
    console.log("crisp_token_id_user", crisp_token_id_user);
    // T???o ra token cho kh??ch v??ng lai. M???i kh??ch v??ng s??? t???n t???i ng???u nhi??n 1 tiken
    const crisp_token_id_guest = `token_${Math.floor(
      100000000000 + Math.random() * 900000000000
    )}`;
    // $crisp = [];
    // M???i ng?????i d??ng ????ng nh???p mu???n l??u l???i tin nh???n ???? chat v???i admin th?? ph???i c?? 1 token ????? l??u l???i tr???ng th??i ????. Khi ????ng xu???t , ????ng nh???p l???i s??? v??n l??u l???i tin nh???n c??
    // N???u kh??ch v??ng lai th?? kh??ng c???n l??u l???i tin nh???n ????
    if (loginUserSucces?.user) {
      // console.log("c34235");
      window.CRISP_TOKEN_ID = crisp_token_id_user;
      window.CRISP_WEBSITE_ID = "04ca693d-e6a6-47ed-9472-7bc4076f418e";
      // (function () {
      let d = document;
      let s = d.createElement("script");
      s.src = "//client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    } else {
      window.CRISP_TOKEN_ID = crisp_token_id_guest;
      setTimeout(() => {
         window.CRISP_WEBSITE_ID = "04ca693d-e6a6-47ed-9472-7bc4076f418e";
         // (function () {
         let d = document;
         let s = d.createElement("script");
         s.src = "//client.crisp.chat/l.js";
         s.async = 1;
         d.getElementsByTagName("head")[0].appendChild(s);
      }, 1000);
    }
    
  } else {
    // console.log("userLogin1223", userLogin);
  }

  const hanldeChangePage = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleChangeUserogin = (newValue) => {
    setUserLogin(newValue);
  };
  // const userLogin = JSON.parse(localStorage.getItem("user"))

  const dispatch = useDispatch();
  const logout = () => {
    window.open("http://localhost:8080/api/v1/users/logout", "_self");
    dispatch({ type: "LOGOUT" });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeFilter = (event) => {
    const data = event.target.value;
    console.log("data search", data);
    // console.log("data search wordEntered", wordEntered);
    setWordEntered(data);
    const newFilter = bookList?.data?.filter((value) => {
      // include ????? xem m???t chu???i c?? ??c t??m th???y trong chu???i kh??c hay kh??ng
      return value.name.toLowerCase().includes(data.toLowerCase());
    });
    if (data === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const handleNavigate = () => {
    history.push("/search/");
    // history.push({
    //   pathname: "/search/",
    //   search: `?search=${wordEntered}`,
    // });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    if (!cateList) {
      dispatch(getCateList());
    }

    return () => dispatch(resetCateList());
  }, []);
  const history = useHistory();
  const array = [];
  const children = [];
  const cateListFilter = [];
  const cateListDuplicate = [];
  const { successUpdateUserCurrent } = useSelector(
    (state) => state.UserReducer
  );

  // useEffect

  useEffect(() => {
    if (successUpdateUserCurrent) {
      setUserLogin(JSON.parse(localStorage.getItem("user")));
    }
  }, [successUpdateUserCurrent]);

  cateList?.data
    .filter((item) => item.parentCateId === "62e806c528500064e4f9930a")
    .map((item, index) => {
      cateList?.data
        .filter((item2) => item2.parentCateId === item.id)
        .map((item2) =>
          cateListFilter.push({
            parentCateId: item2.parentCateId,
            label: (
              <Box sx={{ width: "250px", borderRadius: 50, cursor: "pointer" }}>
                <a
                  href="https://www.antgroup.com"
                  style={{ width: 248, color: "black", cursor: "pointer" }}
                >
                  {item2.name}
                </a>
              </Box>
            ),
          })
        );
      let groupBy = _(cateListFilter)
        .groupBy((x) => x.parentCateId)
        .map((value, key) => ({ parentCateId: key, children: value }))
        .value();
      // for (let i = 0; i < cateListFilter.length; i++) {
      //   for (let j = 1; j < cateListFilter.length; j++) {
      //     if (
      //       cateListFilter[i].parentCateId === cateListFilter[j].parentCateId
      //     ) {
      //       cateListDuplicate.push({
      //         children: [cateListFilter[i].label],
      //         parentCateId: cateListFilter[i].parentCateId,
      //       });
      //     }
      //   }
      // }

      // console.log("cateListFilter", cateListFilter);
      // console.log("groupBy", groupBy);
      // console.log("array", array);
      // console.log("index", index);[[...]]
      array.push({
        // key: `'${index}'`,
        id: item.id,
        label: item.name,
        // children: [
        //   // {
        //   //   // key: "2-2",
        //   //   label: "4th menu item",
        //   // },
        // ],
      });
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < groupBy.length; j++) {
          if (array[i].id === groupBy[j].parentCateId) {
            array[i] = {
              ...array[i],
              ...groupBy[j],
            };
            // array[`${i}`].push({ children: cateListFilter[j].label });
          }
        }
      }
      // const arrayFilter = _.uniqBy(cateListFilter, "name");
      // arrayFilter.map((item) => {});
      // console.log("arrayFilter", arrayFilter);

      // for (let i = 0; i <= index; i++) {
      //   array1.push({
      //     children: [
      //       {
      //         // key: "2-2",
      //         label: arrayFilter.name,
      //       },
      //     ],
      //   });
      // }
    });
  // console.log("array", array);
  const menuDashboard = (
    <Menu>
      <Menu.Item key="0">
        <NavLink to="/userInfo">Xem th??ng tin</NavLink>
      </Menu.Item>

      <Menu.Item key="2" className="mr-3">
        {" "}
        <button
          onClick={() => {
            // // localStorage.removeItem("profile");
            // // localStorage.removeItem("user");
            // // localStorage.removeItem("token");
            history.push("");
            dispatch(logout());
          }}
          className="text-blue-800"
        >
          ????ng xu???t
        </button>{" "}
      </Menu.Item>
    </Menu>
  );
  const menu = (
    <Menu
      style={{
        width: 180,
        borderRadius: "10px",
        "& .ant-dropdown-menu-submenu-popup ul": { borderRadius: 50 },
      }}
      items={array}
    />
  );
  console.log("cateList", cateList);
  return (
    <div className="bg-white ">
      <Container
        maxWidth="xl "
        className="fixed z-20 w-full p-2"
        style={{ padding: 0 }}
      >
        <Popover className=" bg-white  ">
          <div className=" mx-auto text-sm">
            <div
              className="flex justify-between px-0 lg:justify-between py-2 items-center lg:px-8 md:justify-start md:space-x-10"
              style={{ boxShadow: "#8080800d 0px 4px 7px 1px" }}
            >
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <NavLink to="/">
                  <img
                    className="h-7 w-auto sm:h-8 lg:h-10"
                    src="../img/logo_white.png"
                    alt=""
                  />
                </NavLink>
                <Box className="hidden  lg:block">
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    style={{ borderRadius: 50 }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Button
                          sx={{ display: "flex" }}
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                        >
                          <MenuIcon />
                          <ArrowDropDownIcon />
                        </Button>
                        {/* <DownOutlined /> */}
                      </Space>
                    </a>
                  </Dropdown>
                </Box>
              </div>
              {/* g???i t??n action v??o t??m  ki???m ?search ph???i c?? form button c?? submit */}
              <form autocomplete="off" className="w-40 lg:w-fit">
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "10px",
                    padding: "5px",
                    maxWidth: "680px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Box sx={{ display: "flex", flex: "1 1 0" }}>
                    <TextField
                      fullWidth
                      // autoComplete="false"

                      value={wordEntered}
                      onChange={handleChangeFilter}
                      size="small"
                      name="search" //quan trong
                      type="text"
                      label="T??m ki???m..."
                      className="header__navigationBar-text text-xs lg:text-base"
                      sx={{
                        backgroundColor: "#f8f8f8",
                        outline: "none",
                        border: "none",
                      }}
                    />
                    <Button
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px 0",
                        background:
                          "linear-gradient(107.23deg,#00AB55 ,  #049e51 100%)",
                        color: "white",
                        marginLeft: "10px",
                      }}
                      type="submit" //quan tr???ng
                      onClick={handleNavigate}
                      className="header__navigationBar-button"
                    >
                      <SearchOutlined
                        sx={{
                          display: "inline-block",
                          // width: "26px",
                          // height: "26px",
                        }}
                        className="w-2 h-2 lg:w-6 lg:h-6"
                      />
                    </Button>
                  </Box>
                  {filteredData.length !== 0 && (
                    <Box
                      className={`${classes.dataResult} absolute mt-6  z-30 bg-white `}
                    >
                      {filteredData?.map((value, index) => {
                        return (
                          <NavLink
                            to={`/productDetail/${value?._id}`}
                            className={classes.dataItem}
                            // target=""
                            sx={{ paddingTop: "5px" }}
                            onClick={hanldeChangePage}
                          >
                            <p
                              className="truncate"
                              style={{ paddingTop: "10px" }}
                            >
                              {value.name}
                            </p>
                          </NavLink>
                        );
                      })}
                    </Box>
                  )}
                </Box>
              </form>

              <div className=" flex md:flex items-center justify-end md:flex-1 lg:w-0">
                <NavLink
                  to="/cart"
                  className="whitespace-nowrap text-sm font-medium text-gray-500 hover:text-red-600 "
                >
                  <Badge
                    badgeContent={quanityCart ? quanityCart : "0"}
                    color="primary"
                  >
                    {" "}
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </NavLink>
                {/*    {loginUserSucces  || userLogin ? ( */}
                {loginUserSucces ? (
                  <div>
                    <Dropdown overlay={menuDashboard} trigger={["click"]}>
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="text-2xl ml-5 rounded-full bg-red-200 mr-4 ant-dropdown-link
                onClick={(e) => e.preventDefault()}"
                      >
                        {/* {loginUserSucces.userName.substr(0, 1)} */}
                      
                          
                          <img
                            src={loginUserSucces?.user.avatar}
                            alt="avatar"
                            className="rounded-full"
                          />
                       
                      </div>
                    </Dropdown>
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    className=" px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500 hover:text-red-600"
                  >
                    ????ng nh???p
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </Popover>
      </Container>
    </div>
  );
}
