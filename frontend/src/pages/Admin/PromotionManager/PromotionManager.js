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
import Chip from "@mui/material/Chip";
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

import {
  getShipperList,
  resetShipperList,
} from "../../../redux/action/shipperAction";

import {
  getAuthorList,
  resetAuthorList,
} from "../../../redux/action/authorAction";
import CreatePromotion from "./CreatePromotion/CreatePromotion";
import OptionPromotion from "./OptionPromotion/OptionPromotion";
import { getPromotionList } from "../../../redux/action/promotionAction";
import moment from "moment";

// import Label from "../../components/Label";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "title", label: "Tên chương trình KM", alignRight: false },
  { id: "price", label: "Giá giảm", alignRight: false },
  { id: "startDate", label: "Ngày bắt đầu", alignRight: false },
  { id: "endDate", label: "Ngày hết hạn", alignRight: false },
  { id: "code", label: "Mã giảm giá", alignRight: false },
  { id: "activeCode", label: "Trạng thái", alignRight: false },
  { id: "Thao tác" },
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
// function changeActive(activeCode) {
//   if (activeCode) {
//     return "Sắp diễn ra";
//   } else {
//     return "Đang diễn ra";
//   } else {
//     return "Kết thúc";
//   }
// }
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

export default function PromotionManager() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    promotionList,
    successCreatePromotion,
    successUpdatePromotion,
    successDeletePromotion,
  } = useSelector((state) => state.PromotionReducer);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // get list user lần đầu
    if (!promotionList) {
      dispatch(getPromotionList());
    }
    return () => dispatch(resetAuthorList());
  }, []);

  useEffect(() => {
    if (
      successCreatePromotion ||
      successUpdatePromotion ||
      successDeletePromotion
    ) {
      dispatch(getPromotionList());
    }
  }, [successCreatePromotion, successUpdatePromotion, successDeletePromotion]);

  useEffect(() => {
    if (successCreatePromotion) {
      enqueueSnackbar("Thêm chương trình KM thành công!", {
        variant: "success",
      });
      return;
    }
  }, [successCreatePromotion]);

  useEffect(() => {
    if (successUpdatePromotion) {
      enqueueSnackbar("Chỉnh sửa khuyến mãi thành công!", {
        variant: "success",
      });
      return;
    }
  }, [successUpdatePromotion]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = promotionList?.data.map((n) => n.fullName);
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - promotionList?.result)
      : 0;

  const filteredUsers = applySortFilter(
    promotionList?.data,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = promotionList?.result === 0;

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
            Khuyến mãi
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <CreatePromotion />
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
              rowCount={promotionList?.result}
              // numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    _id,
                    title,
                    code,
                    price,
                    miniPrice,
                    startDate,
                    expiryDate,
                    activeCode,
                  } = row;
                  const isItemSelected = selected.indexOf(title) !== -1;
                  return (
                    <TableRow hover key={_id} tabIndex={-1} _id="checkbox">
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, title)}
                        />
                      </TableCell>

                      <TableCell align="left">{title}</TableCell>

                      <TableCell align="left">
                        {(price * 1).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}{" "}
                        /{" "}
                        {(miniPrice * 1).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </TableCell>
                      {/* <TableCell align="left">{price_discount}</TableCell> */}
                      <TableCell align="left">
                        {moment(startDate)?.format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell align="left">
                        {moment(expiryDate)?.format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell align="left">{code}</TableCell>
                      {/* <TableCell align="left">{activeCode}</TableCell> */}
                      <TableCell align="left">
                        {activeCode === "Sắp diễn ra" ? (
                          <Chip label="Sắp diễn ra" color="warning" />
                        ) : activeCode === "Đang diễn ra" ? (
                          <Chip label="Đang diễn ra" color="success" />
                        ) : (
                          <Chip label="Kết thúc" color="error" />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <OptionPromotion id={_id} promotion={row} />
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
          count={promotionList?.result}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
