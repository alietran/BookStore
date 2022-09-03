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

// import Label from "../../components/Label";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
 
  { id: "id", label: "Mã đơn hàng", alignRight: false },
  { id: "name", label: "Tên khách hàng", alignRight: false },
  { id: "address", label: "Địa chỉ", alignRight: false },
  { id: "date", label: "Ngày đặt", alignRight: false },
  { id: "date", label: "Trạng thái", alignRight: false },
  { id: "payment method", label: "Phương thức thanh toán", alignRight: false },
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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
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
  const { orderList } = useSelector((state) => state.OrderReducer);
  // console.log("successDeleteCate", successDeleteCate);
  // const { successUpdateUserCurrent } = useSelector(
  //   (state) => state.AuthReducer
  // );

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // get list user lần đầu
    if (!orderList) {
      dispatch(getOrderList());
    }
    return () => dispatch(resetOrder());
  }, []);

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList?.result) : 0;

  const filteredUsers = applySortFilter(
    orderList?.data,
    getComparator(order, orderBy),
    filterName
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
        mt={7.5}
      >
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom>
            Tác giả
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        {/* <CreateAuthor /> */}
      </Stack>
      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          searchName={"Tìm tác giả"}
        />

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
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { _id, address, status, createdAt, paymentMethod } =
                    row;
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
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) =>
                            handleClick(event, address.fullName)
                          }
                        />
                      </TableCell>
                      <TableCell align="left">{_id}</TableCell>
                      <TableCell align="left">{address.fullName}</TableCell>
                      <TableCell align="left">
                        {address.address +
                          ", " +
                          address.ward +
                          ", " +
                          address.district +
                          ", " +
                          address.city}
                      </TableCell>
                      {/* {/* <TableCell align="left">{name}</TableCell> */}
                      <TableCell align="left">
                        {moment(createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="left">{status}</TableCell>
                      <TableCell align="left">{paymentMethod.name}</TableCell>
                      <TableCell align="center">
                        <OptionOrder id={_id} order={row} />
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
      </Card>
    </Container>
  );
}