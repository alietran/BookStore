import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
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
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const logout = () => {
    window.open("http://localhost:8080/api/v1/users/logout", "_self");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <Popover className="relative bg-white ">
      <div className=" mx-auto px-4 sm:px-6 text-sm">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <NavLink to="#">
              <span className="sr-only">Workflow</span>
              <img
                className="h-full w-auto sm:h-10"
                src="../img/logo_white.png"
                alt=""
              />
            </NavLink>
          </div>

          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <NavLink
              to="/home"
              className="text-sm font-medium text-gray-500 hover:text-red-600 "
              activeClassName="border-b-2 border-black"
            >
              TRANG CHỦ
            </NavLink>
            <NavLink
              to="/about"
              className="text-sm font-medium text-gray-500 hover:text-red-600"
              activeClassName="border-b-2 border-black"
            >
              GIỚI THIỆU
            </NavLink>
            <NavLink
              to="/contact"
              className="text-sm font-medium text-gray-500 hover:text-red-600"
              activeClassName="border-b-2 border-black"
            >
              LIÊN HỆ
            </NavLink>
            {/* <NavLink
              to="/shop"
              className="text-sm font-medium text-gray-500 hover:text-red-600"
              activeClassName="border-b-2 border-black"
            >
              CỬA HÀNG
            </NavLink> */}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "text-gray-900" : "text-gray-500",
                      "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    )}
                  >
                    <span className="text-sm">THỂ LOẠI</span>
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                            >
                              <item.icon
                                className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Box className=" hover:text-red-600  px-5 duration-500 cursor-pointer">
              <Popover className="relative">
                <Popover.Button>
                  <SearchOutlinedIcon className="search" />
                </Popover.Button>

                <Transition>
                  <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative  bg-white px-4 py-5 flex justify-between">
                        <TextField
                          id="standard-basic"
                          label="Nhập từ khóa"
                          variant="standard"
                          className="w-10/12"
                        />
                        <Button variant="contained" className="px-4 py-2">
                          Tìm
                        </Button>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
              <div className="search__bar"></div>
            </Box>
            <NavLink
              to="#"
              className="whitespace-nowrap text-sm font-medium text-gray-500 hover:text-red-600 "
            >
              <ShoppingCartOutlinedIcon />
            </NavLink>

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
          </div>
        </div>
      </div>
    </Popover>
  );
}
