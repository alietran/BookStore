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
import _truncate from "lodash/truncate";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList, resetUserList } from "../../../redux/action/adminAction";
// import UserListToolbar from "../../components/user/UserListToolbar";
// import UserMoreMenu from "../components/user/UserMoreMenu";
import UserListHead from "../../../components/user/UserListHead";
import UserListToolbar from "../../../components/user/UserListToolbar";
import Label from "../../../components/Label";
import {
  getCateList,
  resetCateList,
} from "../../../redux/action/categoryAction";
import CreateBook from "./CreateBook/CreateBook";
import OptionBook from "./OptionBook/OptionBook";
import { getBookList, resetBookList } from "../../../redux/action/bookAction";
import Loading from "../../../components/Loading/Loading";

// import Label from "../../components/Label";
import Truncate from "react-truncate-html";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "image", label: "Hình ảnh", alignRight: false },
  { id: "name", label: "Tên sách", alignRight: false },
  { id: "price", label: "Giá", alignRight: false },
  { id: "desc", label: "Mô tả", alignRight: false },
  { id: "quantity", label: "Số lượng", alignRight: false },
  { id: "totalPage", label: "Số trang", alignRight: false },
  { id: "publisher,", label: "Nhà xuất bản", alignRight: false },
  { id: "issuer,", label: "Nhà phát hành", alignRight: false },
  { id: "size", label: "Kích thước", alignRight: false },
  { id: "", label: "Thao tác", alignRight: false },
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
  console.log("query435", query);
  console.log("arra34535y", array);
  if (query) {
    return filter(
      array,
      (_user) => _user?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function BookManager() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    successDeleteBook,
    bookList,
    successCreateBook,
    successUpdateBook,
    loadingBookList,
  } = useSelector((state) => state.BookReducer);
  // console.log("successDeleteCate", successDeleteCate);
  // const { successUpdateUserCurrent } = useSelector(
  //   (state) => state.AuthReducer
  // );

  const { successUpdateReceipt, successCreateReceipt } =
    useSelector((state) => state.ReceiptReducer);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
 
  useEffect(() => {
    // get list user lần đầu
    if (!bookList) {
      dispatch(getBookList());
    }
    return () => dispatch(resetBookList());
  }, [bookList]);

  useEffect(() => {
    if (
      successCreateBook ||
      successUpdateBook ||
      successDeleteBook ||
      successUpdateReceipt
    ) {
      dispatch(getBookList());
    }
  }, [
    successCreateBook,
    successUpdateBook,
    successDeleteBook,
    successUpdateReceipt,
  ]);

  useEffect(() => {
    if (successCreateBook) {
      enqueueSnackbar("Thêm sách thành công!", { variant: "success" });
      return;
    }
  }, [successCreateBook]);

  useEffect(() => {
    if (successUpdateBook) {
      enqueueSnackbar("Chỉnh sửa sách thành công!", { variant: "success" });
      return;
    }
  }, [successUpdateBook]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bookList?.data.map((n) => n.fullName);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookList?.result) : 0;

  const filteredUsers = applySortFilter(
    bookList?.data,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = bookList?.result === 0;

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
      Sách{" "}
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
            Sách
          </Typography>

          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <CreateBook />
      </Stack>
      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          searchLabelName={"Tìm sách"}
        />
        {loadingBookList ? (
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
                  rowCount={bookList?.result}
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
                        name,
                        desc,
                        price,
                        quantity,
                        image,
                        bookCover,
                        totalPage,
                        publisher,
                        issuer,
                        size,
                      } = row;
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

                          <TableCell align="left">
                            <img src={image} alt="hinh anh" />
                          </TableCell>
                          <TableCell align="left">
                            <p>{name}</p>{" "}
                          </TableCell>
                          <TableCell align="left">{price}</TableCell>
                          <TableCell
                            align="left"
                            // className="line-clamp-1  "
                            // dangerouslySetInnerHTML={{ __html: desc }}
                          >
                            <Truncate
                              lines={3}
                              dangerouslySetInnerHTML={{
                                __html: desc,
                              }}
                            />
                          </TableCell>

                          <TableCell align="left">{quantity}</TableCell>

                          <TableCell align="left">{totalPage}</TableCell>
                          <TableCell align="left">{publisher}</TableCell>
                          <TableCell align="left">{issuer.name}</TableCell>
                          <TableCell align="left">{size}</TableCell>

                          <TableCell align="center">
                            <OptionBook id={_id} book={row} />
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
              count={bookList?.result}
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
