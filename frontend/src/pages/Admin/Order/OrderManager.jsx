import React, { useEffect } from "react";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Breadcrumbs,
  Link,
  Chip,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { Link as RouterLink } from "react-router-dom";
import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
// import UserListToolbar from "../../components/user";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList, resetUserList } from "../../../redux/action/adminAction";
// import UserListToolbar from "../../components/user/UserListToolbar";
// import UserMoreMenu from "../components/user/UserMoreMenu";
import UserListHead from "../../../components/user/UserListHead";
import UserListToolbar from "../../../components/user/UserListToolbar";
import Label from "../../../components/Label";
import moment from "moment";
import {
  getShipperList,
  resetShipperList,
} from "../../../redux/action/shipperAction";

import {
  getAuthorList,
  resetAuthorList,
} from "../../../redux/action/authorAction";
import { getOrderList, resetOrder } from "../../../redux/action/orderAction";
import OptionOrder from "./OptionOrder/OptionOrder";

import Loading from "../../../components/Loading/Loading";

import OrderToolbar from "../../../components/Order/OrderToolbar";

// import Label from "../../components/Label";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "Mã đơn hàng", alignRight: false },
  { id: "name", label: "Tên khách hàng", alignRight: false },
  { id: "phoneNumber", label: "Số điện thoại", alignRight: false },

  { id: "content", label: "Ngày đặt", alignRight: false },
  { id: "rating", label: "Trạng thái", alignRight: false },
  { id: "date", label: "Giá tiền", alignRight: false },
  { id: "status", label: "Thanh toán", alignRight: false },

  { id: "option", label: "Thao tác", alignRight: false },

  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function changeActive(active) {
  if (active) {
    return "Active";
  } else {
    return "Banned";
  }
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, selectTag) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  // console.log("array", array);
  if (query && selectTag === "infoUser") {
    console.log("query", query);
    return filter(
      array,
      (item) =>
        item.address.fullName.indexOf(query) !== -1 ||
        item.address.phoneNumber.indexOf(query) !== -1
    );
  } else if (query && selectTag === "createdDate") {
    return filter(array, (item) => item.createdAt.indexOf(query) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function OrderManager() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    // authorList,
    successCreateAuthor,
    successUpdateAuthor,
    successDeleteAuthor,
  } = useSelector((state) => state.AuthorReducer);
  const { orderList, loadingOrderList, successUpdateOrder } = useSelector(
    (state) => state.OrderReducer
  );
  console.log("successUpdateOrder", successUpdateOrder);
  // const { successUpdateUserCurrent } = useSelector(
  //   (state) => state.AuthReducer
  // );

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectTag, setSelectTag] = useState("infoUser");
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    // get list user lần đầu
    if (!orderList) {
      dispatch(getOrderList());
    }
    // setLoading(false);
    // return () => dispatch(resetOrder());
  }, [orderList]);
  
  useEffect(() => {
    // get list user lần đầu
    if (successUpdateOrder || successUpdateOrder === "") {
      // console.log("successUpdateOrder3253", successUpdateOrder);
      dispatch(getOrderList());
    }
    // setLoading(false);
    // return () => dispatch(resetOrder());
  }, [successUpdateOrder]);
  //  useEffect(() => {
  //    if (orderList?.result !== 0) setLoading(false);
  //  }, [orderList]);
  //   console.log("loading",loading)

  useEffect(() => {
    if (successCreateAuthor || successUpdateAuthor || successDeleteAuthor) {
      dispatch(getAuthorList());
    }
  }, [successCreateAuthor, successUpdateAuthor, successDeleteAuthor]);

  useEffect(() => {
    if (successCreateAuthor) {
      enqueueSnackbar("Thêm tác giả thành công!", { variant: "success" });
      return;
    }
  }, [successCreateAuthor]);

  useEffect(() => {
    if (successUpdateAuthor) {
      enqueueSnackbar("Chỉnh sửa tác giả thành công!", { variant: "success" });
      return;
    }
  }, [successUpdateAuthor]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orderList?.data.map((n) => n.fullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleSelectTag = (event) => {
    setSelectTag(event.target.value);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList?.result) : 0;

  const filteredUsers = applySortFilter(
    orderList?.data,
    getComparator(order, orderBy),
    filterName,
    selectTag
  );

  const isUserNotFound = orderList?.result === 0;

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      href="/admin/dashboard"
      color="text.primary"
      sx={{ "&:hover": { color: "#212B36" } }}
    >
      Trang chủ
    </Link>,
    <Link
      underline="hover"
      key="2"
      href="/admin/users/account"
      color="text.primary"
      sx={{ "&:hover": { color: "#212B36" } }}
    >
      Đơn hàng
    </Link>,
    <Typography key="3" color="inherit">
      Danh sách
    </Typography>,
  ];
  return (
    <Container
      sx={{ paddingRight: "0px !important", paddingLeft: "0px !important" }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        mt={3}
      >
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom>
            Đơn hàng
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        {/* <CreateAuthor /> */}
      </Stack>
      <Card>
        <OrderToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          onSelectTag={handleSelectTag}
          selectTag={selectTag}
        />
        {loadingOrderList ? (
          <Loading />
        ) : (
          <>
            {" "}
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orderList?.result}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => {
                      const {
                        _id,
                        address,
                        status,
                        createdAt,
                        paymentMethod,
                        totalPrice,
                        shipper,
                      } = row;
                      const isItemSelected =
                        selected.indexOf(address.fullName) !== -1;
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          _id="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell></TableCell>
                          <TableCell align="left">{_id}</TableCell>
                          <TableCell align="left">{address.fullName}</TableCell>
                          <TableCell align="left">
                            {address.phoneNumber}
                          </TableCell>

                          {/* {/* <TableCell align="left">{name}</TableCell> */}
                          <TableCell align="left">
                            {moment(createdAt).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell align="left">
                            {/* <Chip
                          label={status}
                          color={
                            status === "Đang xử lý"
                              ? "warning"
                              : status === "Đang vận chuyển"
                              ? "secondary"
                              : status === "Đã giao hàng" ? "success" : "error"
                          }
                        /> */}
                            {/* <Label variant="ghost" color={"success"}>
                          Đã xử lý
                        </Label> */}
                            <Label
                              variant="ghost"
                              color={
                                status === "Đang xử lý"
                                  ? "default"
                                  : status === "Đang vận chuyển"
                                  ? "info"
                                  : status === "Đã giao hàng"
                                  ? "success"
                                  : status === "Đã nhận"
                                  ? "success"
                                  : status === "Đã đánh giá"
                                  ? "warning"
                                  : "error"
                              }
                            >
                              {status}
                            </Label>

                            {/* {status === "Đang xử lý" ? (
                          <Chip label="Đã thanh toán" color="primary" />
                        ) : paymentMethod.resultCode === 1000 ? (
                          <Chip label="Chờ thanh toán" color="warning" />
                        ) : (
                          <Chip label="Đã hủy" color="error" />
                        )} */}
                          </TableCell>
                          <TableCell align="left">
                            {totalPrice.toLocaleString()}
                          </TableCell>
                          <TableCell align="left">
                            {paymentMethod.resultCode === 0 ? (
                              <Chip label="Đã thanh toán" color="primary" />
                            ) : paymentMethod.resultCode === 1000 ? (
                              <Chip label="Chờ thanh toán" color="warning" />
                            ) : (
                              <Chip label="Đã hủy" color="error" />
                            )}
                          </TableCell>

                          <TableCell align="center">
                            <OptionOrder
                              hidden={true}
                              id={_id}
                              order={row}
                              shipper={shipper}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {/* {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                   
                  </TableCell>
                </TableRow>
              </TableBody>
            )} */}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={orderList?.result}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Card>
    </Container>
  );
}
