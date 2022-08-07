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

import CreateShipper from "./CreateShipper/CreateShipper";
import { getShipperList, resetShipperList } from "../../../redux/action/shipperAction";
import OptionShipper from "./OptionShipper/OptionShipper";
// import OptionCategory from "./OptionCategory/OptionCategory";

// import Label from "../../components/Label";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Họ tên", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "phoneNumber", label: "Số điện thoại", alignRight: false },
  { id: "active", label: "Trạng thái", alignRight: false },
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

export default function ShipperManager() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    shipperList,
    successCreateShipper,
    successUpdateShipper,
    errorUpdateShipper,
  } = useSelector((state) => state.ShipperReducer);
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
    if (!shipperList) {
      dispatch(getShipperList());
    }
    return () => dispatch(resetShipperList());
  }, []);
  

  useEffect(() => {
    if (successCreateShipper || successUpdateShipper || errorUpdateShipper) {
      dispatch(getShipperList());
    }
  }, [successCreateShipper, successUpdateShipper, errorUpdateShipper]);

  useEffect(() => {
    if (successCreateShipper) {
      enqueueSnackbar("Thêm thể loại thành công!", { variant: "success" });
      return;
    }
  }, [successCreateShipper]);

  useEffect(() => {
    if (successUpdateShipper) {
      enqueueSnackbar("Chỉnh sửa Thể loại thành công!", { variant: "success" });
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

  const isUserNotFound = shipperList?.result === 0;

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
      Người dùng{" "}
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
            Thể loại 
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
        />

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
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, name)}
                        />
                      </TableCell>

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
          count={shipperList?.result}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
