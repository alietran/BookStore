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
import "./style.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { NavLink } from "react-router-dom";
import { Box, Container, maxWidth } from "@mui/system";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
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
const resources = [
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
    icon: SupportIcon,
  },
  {
    name: "Guides",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "#",
    icon: BookmarkAltIcon,
  },
  {
    name: "Events",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "#",
    icon: CalendarIcon,
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously.",
    href: "#",
    icon: ShieldCheckIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { cateList } = useSelector((state) => state.CateReducer);
  const classes = useStyles();
  // const {userLogin, setUserLogin}
  const [userLogin, setUserLogin] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const handleChangeUserogin = (newValue) => {
    setUserLogin(newValue);
  };
  // const userLogin = JSON.parse(localStorage.getItem("user"))
  console.log("userLogin", userLogin?.user.fullName);
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
  const handleClose = () => {
    setAnchorEl(null);
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

  const array = [];
  const children = [];
  const cateListFilter = [];
  const cateListDuplicate = [];
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

      console.log("cateListFilter", cateListFilter);
      console.log("groupBy", groupBy);
      console.log("array", array);
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
  console.log("array", array);
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
    <div className="bg-white">
      <Container maxWidth="xl">
        <Popover className="relative bg-white ">
          <div className=" mx-auto px-4 sm:px-6 text-sm">
            <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <NavLink to="#">
                  <img
                    className="h-full w-auto sm:h-10"
                    src="../img/logo_white.png"
                    alt=""
                  />
                </NavLink>
                <Box>
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
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "10px",
                  padding: "5px",
                  display: "flex",
                  flex: "1 1 0",
                  maxWidth: "670px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Tìm kiếm..."
                  className="header__navigationBar-text"
                  sx={{
                    backgroundColor: "transparent",
                    outline: "none",
                    border: "none",
                  }}
                />
                <Button
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px",
                    background:
                      "linear-gradient(107.23deg,#00AB55 ,  #049e51 100%)",
                    color: "white",
                  }}
                  className="header__navigationBar-button"
                >
                  <SearchOutlined
                    sx={{
                      display: "inline-block",
                      width: "26px",
                      height: "26px",
                    }}
                  />
                </Button>
              </Box>

              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <NavLink
                  to="#"
                  className="whitespace-nowrap text-sm font-medium text-gray-500 hover:text-red-600 "
                >
                  <ShoppingCartOutlinedIcon />
                </NavLink>
                {userLogin ? (
                  <NavLink
                    to="/info"
                    className=" px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500 hover:text-red-600"
                  >
                    {userLogin?.user.fullName}
                  </NavLink>
                ) : (
                  <Box>
                    <NavLink
                      to="/login"
                      className=" px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500 hover:text-red-600"
                    >
                      Đăng nhập
                    </NavLink>
                    <NavLink
                      to="#"
                      className="ml-8 whitespace-nowrap inline-flex items-center justify-center duration-700  px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white bg-red-500 hover:bg-red-600"
                      onClick={logout}
                    >
                      Đăng ký
                    </NavLink>
                  </Box>
                )}
              </div>
            </div>
          </div>
        </Popover>
      </Container>
    </div>
  );
}
