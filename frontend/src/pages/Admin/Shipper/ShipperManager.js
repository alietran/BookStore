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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { Link as RouterLink, useParams } from "react-router-dom";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateShipper from "./CreateShipper/CreateShipper";
import {
  getShipperList,
  resetShipperList,
} from "../../../redux/action/shipperAction";
import OptionShipper from "./OptionShipper/OptionShipper";
import { getOrderList } from "../../../redux/action/orderAction";
// import OptionCategory from "./OptionCategory/OptionCategory";
import moment from "moment";
import OptionOrder from "../Order/OptionOrder/OptionOrder";
import Loading from "../../../components/Loading/Loading";
// import Label from "../../components/Label";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Họ tên", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "phoneNumber", label: "Số điện thoại", alignRight: false },
  { id: "active", label: "Trạng thái", alignRight: false },
  { id: "active", label: "Đơn hàng", alignCenter: true },
  { id: "" },
];

const TABLE_HEAD_SHIPPER = [
  { id: "id", label: "Mã đơn hàng", alignRight: false },
  { id: "name", label: "Tên khách hàng", alignRight: false },

  { id: "date", label: "Ngày đặt", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },

  { id: "total", label: "Tổng tiền", alignRight: false },
  { id: "payment", label: "Thanh toán", alignRight: false },
  { id: "option", label: "Thao tác", alignRight: false },

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  console.log("array34", array);
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function ShipperManager() {
  const dispatch = useDispatch();
  const params = useParams()
  const { enqueueSnackbar } = useSnackbar();
  const {
    shipperList,
    successCreateShipper,
    successUpdateShipper,
    errorUpdateShipper,
    successDeleteShipper,
    loadingShipperList,
  } = useSelector((state) => state.ShipperReducer);

  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsPerPage1, setRowsPerPage1] = useState(5);
  const [open, setOpen] = useState(false);
  const { orderList } = useSelector((state) => state.OrderReducer);
   let { orderDetailList } = useSelector(
     (state) => state.OrderDetailReducer
   );
  const [list, setList] = useState();
  console.log("orderList", orderList);

  useEffect(() => {
    if (!orderList) {
      dispatch(getOrderList());
    }
  }, [orderList]);
  
  useEffect(() => {
    // get list user lần đầu
    if (!shipperList) {
      dispatch(getShipperList());
    }
    return () => dispatch(resetShipperList());
  }, []);

  useEffect(() => {
    if (
      successCreateShipper ||
      successUpdateShipper ||
      errorUpdateShipper ||
      successDeleteShipper
    ) {
      dispatch(getShipperList());
    }
  }, [
    successCreateShipper,
    successUpdateShipper,
    errorUpdateShipper,
    successDeleteShipper,
  ]);

  useEffect(() => {
    if (successCreateShipper) {
      enqueueSnackbar("Thêm shipper thành công!", { variant: "success" });
      return;
    }
  }, [successCreateShipper]);

  useEffect(() => {
    if (successUpdateShipper) {
      enqueueSnackbar("Chỉnh sửa shipper thành công!", { variant: "success" });
      return;
    }
  }, [successUpdateShipper]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = shipperList?.data.map((n) => n.fullName);
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
  const handleChangePage1 = (event, newPage) => {
    setPage1(newPage);
  };

  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shipperList?.result) : 0;

  const filteredUsers = applySortFilter(
    shipperList?.data,
    getComparator(order, orderBy),
    filterName
  );

  const filteredShipper = applySortFilter(
    list,
    getComparator(order, orderBy),
    filterName
  );

  const handleClose = () => {
    setOpen(false);
  };
  const isUserNotFound = shipperList?.result === 0;
   orderDetailList = orderDetailList?.data.filter(
      (item) => item?.order?.id === params.orderId
    );
  const handleList = (_id) => {
    console.log("id", typeof _id);
    console.log("orderList232", orderList);
    setOpen(true);
    const order = orderList.data.filter((item) => item.shipper?.id === _id);
    console.log("order", order);
    setList(order);
  };
  console.log("list", list);

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
    Shipper
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
            Shipper
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <CreateShipper />
      </Stack>
      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          searchLabelName={"Tìm người giao hàng"}
        />
        {loadingShipperList ? (
          <Loading />
        ) : (
          <>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={shipperList?.result}
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
                      const { _id, name, phoneNumber, email, active } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          _id="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                         

                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{phoneNumber}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(!active && "error") || "success"}
                            >
                              {changeActive(active)}
                            </Label>
                          </TableCell>
                          <TableCell align="center">
                            {" "}
                            <VisibilityIcon
                              onClick={() => handleList(_id)}
                              className="text-blue-500"
                              sx={{
                                fontSize: 32,
                              }}
                            />
                            <Dialog
                              fullWidth={true}
                              maxWidth="lg"
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="responsive-dialog-title"
                            >
                              <DialogTitle id="responsive-dialog-title">
                                Danh sách đơn hàng
                              </DialogTitle>
                              <DialogContent>
                                <Container
                                  sx={{
                                    paddingRight: "0px !important",
                                    paddingLeft: "0px !important",
                                  }}
                                >
                                  <Card>
                                    <TableContainer sx={{ minWidth: 800 }}>
                                      <Table>
                                        <UserListHead
                                          order={order}
                                          orderBy={orderBy}
                                          headLabel={TABLE_HEAD_SHIPPER}
                                          rowCount={list?.length}
                                          numSelected={selected.length}
                                          onRequestSort={handleRequestSort}
                                          onSelectAllClick={
                                            handleSelectAllClick
                                          }
                                        />
                                        <TableBody>
                                          {filteredShipper
                                            ?.slice(
                                              page1 * rowsPerPage1,
                                              page1 * rowsPerPage1 +
                                                rowsPerPage1
                                            )
                                            .map((row) => {
                                              const {
                                                _id,
                                                address,
                                                status,
                                                createdAt,
                                                paymentMethod,
                                                totalPrice,
                                              } = row;
                                              const isItemSelected =
                                                selected.indexOf(
                                                  address.fullName
                                                ) !== -1;

                                              return (
                                                <TableRow
                                                  hover
                                                  key={_id}
                                                  tabIndex={-1}
                                                  _id="checkbox"
                                                  selected={isItemSelected}
                                                  aria-checked={isItemSelected}
                                                >
                                                  <TableCell align="left">
                                                    {_id}
                                                  </TableCell>
                                                  <TableCell align="left">
                                                    {address.fullName}
                                                  </TableCell>

                                                  <TableCell align="left">
                                                    {moment(createdAt).format(
                                                      "DD/MM/YYYY"
                                                    )}
                                                  </TableCell>
                                                  <TableCell align="left">
                                                    <Label
                                                      variant="ghost"
                                                      color={
                                                        status === "Đang xử lý"
                                                          ? "warning"
                                                          : status ===
                                                            "Đang vận chuyển"
                                                          ? "info"
                                                          : status ===
                                                              "Đã giao hàng" ||
                                                            status ===
                                                              "Đã nhận" || status ===
                                                            "Đã đánh giá"
                                                          ? "success"
                                                          : "error"
                                                      }
                                                    >
                                                      {status}
                                                    </Label>
                                                  </TableCell>
                                                  <TableCell align="left">
                                                    {totalPrice.toLocaleString()}
                                                  </TableCell>
                                                  <TableCell align="left">
                                                    {paymentMethod.resultCode ===
                                                    0 ? (
                                                      <Chip
                                                        label="Đã thanh toán"
                                                        color="primary"
                                                      />
                                                    ) : paymentMethod.resultCode ===
                                                      1000 ? (
                                                      <Chip
                                                        label="Chờ thanh toán"
                                                        color="warning"
                                                      />
                                                    ) : (
                                                      <Chip
                                                        label="Đã hủy"
                                                        color="error"
                                                      />
                                                    )}
                                                  </TableCell>

                                                  <TableCell align="center">
                                                    <OptionOrder
                                                      hidden={true}
                                                      id={_id}
                                                      order={row}
                                                    />
                                                  </TableCell>
                                                </TableRow>
                                              );
                                            })}
                                          {emptyRows > 0 && (
                                            <TableRow
                                              style={{ height: 53 * emptyRows }}
                                            >
                                              <TableCell colSpan={6} />
                                            </TableRow>
                                          )}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>

                                    <TablePagination
                                      rowsPerPageOptions={[5, 10, 25]}
                                      component="div"
                                      count={list?.length}
                                      rowsPerPage={rowsPerPage1}
                                      page={page1}
                                      onPageChange={handleChangePage1}
                                      onRowsPerPageChange={
                                        handleChangeRowsPerPage1
                                      }
                                    />
                                  </Card>
                                </Container>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                          <TableCell align="center">
                            <OptionShipper id={_id} shipper={row} />
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
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={shipperList?.result}
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
